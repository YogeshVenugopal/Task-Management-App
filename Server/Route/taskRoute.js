import express from 'express'
import { protect } from '../Middleware/AuthMiddleware.js';
import { createTask, deleteTask, getDashboardData, getTaskById, getTasks, getUserDashboardData, updateTask, updateTaskChecklist, updateTaskStatus } from '../Controller/taskController.js';

const taskRoute = express.Router()

taskRoute.get('/dashboard-data',protect , getDashboardData);
taskRoute.get('/user-dashboard-data',protect , getUserDashboardData);
taskRoute.get('/',protect , getTasks);
taskRoute.get('/:id',protect , getTaskById);
taskRoute.post('/',protect , createTask);
taskRoute.put('/:id',protect , updateTask);
taskRoute.delete('/:id',protect , deleteTask);
taskRoute.put('/:id/status',protect , updateTaskStatus);
taskRoute.put('/:id/todo',protect , updateTaskChecklist);



export default taskRoute;