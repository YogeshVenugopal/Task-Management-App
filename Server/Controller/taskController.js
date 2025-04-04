import Task from "../Model/Task.js";

export const getDashboardData = async (req, res) => {}

export const getUserDashboardData = async (req, res) => {}

export const getTasks = async (req, res) => {}

export const getTaskById = async (req, res) => {}

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

        if(!Array.isArray(assignedTo) || assignedTo.length === 0){
            return res.status(400).json({message:"AssignedTo must be an array and is required"});
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

        res.status(200).json({message:"Task created successfully", task});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error", error:error});
    }
}

export const updateTask = async (req, res) => {}

export const deleteTask = async (req, res) => {}

export const updateTaskStatus = async (req, res) => {}

export const updateTaskChecklist = async (req, res) => {}