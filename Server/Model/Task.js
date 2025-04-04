import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    }
)

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type:String
    },
    priority:{
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low"
    },
    status:{
        type: String,
        enum: ["Pending", "In progress", "Completed"],
        default: "Pending"
    },
    dueDate:{
        type: Date,
        required: true
    },
    assignTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    attachments:[{
        type: String
    }],
    todos:[todoSchema],
    progress:{
        type: Number,
        default: 0
    }
},
{timestamps: true}
)

const Task = mongoose.model("Task", taskSchema);

export default Task