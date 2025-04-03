import express from 'express'
import { adminOnly, protect } from '../Middleware/AuthMiddleware.js';
import { deleteUser, getUserById, getUsers } from '../Controller/userController.js';

const userRoute = express.Router()

userRoute.get('/', protect, adminOnly, getUsers);
userRoute.get('/:id', protect, getUserById);
userRoute.delete('/:id', protect, adminOnly, deleteUser);


export default userRoute;