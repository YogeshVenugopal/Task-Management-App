import Task from "../Model/Task.js"
import User from "../Model/User.js"
import exceljs from "exceljs"

export const exportTaskReport = async (req, res) => {
    try {
        const task = await Task.find().populate("assignTo", "name email");

        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet("Tasks Reports");

        worksheet.columns = [
            { header: "Task ID", key: "_id", width: 25 },
            { header: "Title", key: "title", width: 30 },
            { header: "Description", key: "description", width: 50 },
            { header: "Priority", key: "priority", width: 15 },
            { header: "Status", key: "status", width: 20 },
            { header: "Due Date", key: "dueDate", width: 20 },
            { header: "Assigned To", key: "assignto", width: 20 },
        ]

        task.forEach((task) => {
            const assignTo = task.assignTo.map((assignTo) => assignTo.name).join(", ");

            worksheet.addRow({
                _id: task._id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate,
                assignTo: assignTo || "Unassigned",
            })
        })

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=task-report.xlsx");

        return workbook.xlsx.write(res).then(() => res.end());
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

export const exportUserReport = async (req, res) => {
    try {
        const users = await User.find().select("name email _id").lean();

        const userTask = await Task.find().populate("assignTo", "name email _id");

        const userTaskMap = {};
        users.forEach((user) => {
            userTaskMap[user._id] = {
                name: user.name,
                email: user.email,
                taskCount: 0,
                pendingTask: 0,
                inProgressTask: 0,
                completedTask: 0,
            }
        })

        userTask.forEach((task) => {
            if (task.assignTo) {
                task.assignTo.forEach((assignUser) => {
                    if (userTaskMap[assignUser._id]) {
                        userTaskMap[assignUser._id].taskCount += 1;
                        if (task.status === "Pending") {
                            userTaskMap[assignUser._id].pendingTask += 1;
                        } else if (task.status === "In progress") {
                            userTaskMap[assignUser._id].inProgressTask += 1;
                        } else if (task.status === "Completed") {
                            userTaskMap[assignUser._id].completedTask += 1;
                        }
                    }
                })
            }
        })

        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet("Users Reports");

        worksheet.columns = [
            { header: "User Name", key: "name", width: 30 },
            { header: "Email", key: "email", width: 30 },
            { header: "Total Assigned Task", key: "taskCount", width: 20 },
            { header: "Pending Task", key: "pendingTask", width: 20 },
            { header: "In Progress Task", key: "inProgressTask", width: 20 },
            { header: "Completed Task", key: "completedTask", width: 20 },
        ]

        Object.values(userTaskMap).forEach((user) => {
            worksheet.addRow(user)
        })

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=user-report.xlsx");

        return workbook.xlsx.write(res).then(() => res.end());
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
} 