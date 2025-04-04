import Task from "../Model/Task.js";
import User from "../Model/User.js";

export const getUsers = async (req, res) => {
    const users = await User.find({ role: 'member' }).select('-password');
    const usersWithTasksCount = await Promise.all(users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: "Pending" });
        const inprogessTasks = await Task.countDocuments({ assignedTo: user._id, status: "In progress" });
        const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: "Completed" });

        return ({
            ...user._doc,
            pendingTasks,
            inprogessTasks,
            completedTasks
        })
    }))

    res.json(usersWithTasksCount);
}

export const getUserById = async (req, res) => { 
    try {
        const user = await User.findById(req.params.id).select('-password');
        if(!user){return res.status(404).json({message:"User not found"})}
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error", error:error});
    }
}
