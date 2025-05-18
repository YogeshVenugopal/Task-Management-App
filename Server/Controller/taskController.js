import Task from "../Model/Task.js";

export const getDashboardData = async (req, res) => {
    try {
        const totalTask = await Task.countDocuments();
        const pendingTask = await Task.countDocuments({ status: "Pending" });
        const completedTask = await Task.countDocuments({ status: "Completed" });
        const overdueTask = await Task.countDocuments({ status: { $ne: "Completed" }, dueDate: { $lt: new Date() } });
        const taskStatus = ['Pending', 'In progress', 'Completed'];
        const taskDistributionRaw = await Task.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        const taskDistribution = taskStatus.reduce((acc, status) => {
            const formattedKey = status.toLowerCase().replace(/\s/g, "_");
            acc[formattedKey] = taskDistributionRaw.find(
                (item) => item._id === status
            )?.count || 0;

            return acc;
        }, {});


        taskDistribution['All'] = totalTask;

        const taskPriority = ['Low', 'Medium', 'High'];
        const taskPriorityLevelRaw = await Task.aggregate([
            {
                $group: {
                    _id: "$priority",
                    count: { $sum: 1 },
                },
            },
        ]);

        const taskPriorityLevel = taskPriority.reduce((acc, priority) => {
            const formattedKey = priority.toLowerCase().replace(/\s/g, "_");
            acc[formattedKey] = taskPriorityLevelRaw.find(
                (item) => item._id === priority
            )?.count || 0;

            return acc;
        }, {});

        const recentTasks = await Task.find().sort({ createdAt: -1 }).limit(10).select("title status priority dueDate createdAt");


        res.status(200).json({
            statiscs: {
                totalTask,
                pendingTask,
                completedTask,
                overdueTask
            },
            charts: {
                taskDistribution,
                taskPriorityLevel,
            },
            recentTasks
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

export const getUserDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;

        const totalTask = await Task.countDocuments({ assignTo: userId });
        const pendingTask = await Task.countDocuments({ status: "Pending", assignTo: userId });
        const completedTask = await Task.countDocuments({ status: "Completed", assignTo: userId });
        const overdueTask = await Task.countDocuments({ 
            assignTo: userId, 
            status: { $ne: "Completed" }, 
            dueDate: { $lt: new Date() } 
        });

        const taskStatus = ['Pending', 'In progress', 'Completed'];
        const taskDistributionRaw = await Task.aggregate([
            {
                $match: { assignTo: userId }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const taskDistribution = taskStatus.reduce((acc, status) => {
            const formattedKey = status.toLowerCase().replace(/\s/g, "_");
            acc[formattedKey] = taskDistributionRaw.find(
                (item) => item._id === status
            )?.count || 0;
            return acc;
        }, {});

        taskDistribution['all'] = totalTask;

        const taskPriority = ['Low', 'Medium', 'High'];
        const taskPriorityLevelRaw = await Task.aggregate([
            {
                $match: { assignTo: userId }
            },
            {
                $group: {
                    _id: "$priority",
                    count: { $sum: 1 }
                }
            }
        ]);

        const taskPriorityLevel = taskPriority.reduce((acc, priority) => {
            const formattedKey = priority.toLowerCase().replace(/\s/g, "_");
            acc[formattedKey] = taskPriorityLevelRaw.find(
                (item) => item._id === priority
            )?.count || 0;
            return acc;
        }, {});

        const recentTasks = await Task.find({ assignTo: userId })
            .sort({ createdAt: -1 })
            .limit(10)
            .select("title status priority dueDate createdAt");

        res.status(200).json({
            statistics: {  // Fixed typo from 'statiscs' to 'statistics'
                totalTask,
                pendingTask,
                completedTask,
                overdueTask
            },
            charts: {
                taskDistribution,
                taskPriorityLevel
            },
            recentTasks
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const getTasks = async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};

        if (status) {
            filter.status = status;
        }

        let tasks;

        if (req.user.role === "admin") {
            tasks = await Task.find(filter).populate("assignTo", "name email profileImageUrl");
        } else {
            tasks = await Task.find({ ...filter, assignTo: req.user.id }).populate("assignTo", "name email profileImageUrl");
        }

        tasks = await Promise.all(
            tasks.map(async (task) => {
                const completedCount = task.todos.filter(
                    (todo) => todo.completed
                ).length;

                return {
                    ...task._doc,
                    completedTodoCount: completedCount,
                };
            })
        );

        const allTasks = await Task.countDocuments(
            req.user.role === "admin" ? {} : { assignTo: req.user._id }
        );

        const pendingTasks = await Task.countDocuments({
            ...filter,
            status: "Pending",
            ...(req.user.role !== "admin" ? { assignTo: req.user._id } : {})
        });

        const inProgessTask = await Task.countDocuments({
            ...filter,
            status: "In progress",
            ...(req.user.role !== "admin" ? { assignTo: req.user._id } : {})
        });

        const completedTask = await Task.countDocuments({
            ...filter,
            status: "Completed",
            ...(req.user.role !== "admin" ? { assignTo: req.user._id } : {})
        });

        res.status(200).json({
            tasks,
            statusSummary: {
                all: allTasks,
                pendingTasks,
                inProgessTask,
                completedTask
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate("assignTo", "name email profileImageUrl");

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

export const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            attachments,
            todoChecklist
        } = req.body;

        if (!Array.isArray(assignedTo) || assignedTo.length === 0) {
            return res.status(400).json({ message: "AssignedTo must be an array and is required" });
        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.user.id,
            todos: todoChecklist,
            attachments
        })

        res.status(200).json({ message: "Task created successfully", task });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.priority = req.body.priority || task.priority;
        task.dueDate = req.body.dueDate || task.dueDate;
        task.assignTo = req.body.assignTo || task.assignTo;
        task.todos = req.body.todos || task.todos;
        task.status = req.body.status || task.status;
        task.attachments = req.body.attachments || task.attachments;

        if (req.body.assignTo) {
            if (!Array.isArray(req.body.assignTo)) {
                return res.status(400).json({ message: "AssignTo must be an array" });
            }
            task.assignTo = req.body.assignTo;
        }
        const updateTask = await task.save();
        res.json({ message: "Task updated successfully", updateTask });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        await task.deleteOne();
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

export const updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        const isAssigned = task.assignTo.some(
            (userId) => userId.toString() === req.user._id.toString()
        )

        if (!isAssigned && req.user.role !== "admin") {
            return res.status(401).json({ message: "You are not authorized to update this task" });
        }

        task.status = req.body.status || task.status;

        if (task.status === "Completed") {
            task.todos.forEach((todo) => {
                todo.completed = true;
            })
            task.progress = 100;
        }

        await task.save();

        res.json({ message: "Task status updated successfully", task });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

export const updateTaskChecklist = async (req, res) => {
    try {

        const { todoChecklist } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        if (!task.assignTo.includes(req.user._id) && req.user.role !== "admin") {
            return res.status(401).json({ message: "You are not authorized to update this task" });
        }
        task.todos = todoChecklist;

        if (task.progress === 100) {
            task.status = "Completed";
        }
        else if (task.progress > 0) {
            task.status = "In progress";
        }
        else {
            task.status = "Pending";
        }

        await task.save();

        const updateTask = await Task.findById(req.params.id).populate("assignTo", "name email profileImageUrl");

        res.json({ message: "Task updated successfully", updateTask });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
}