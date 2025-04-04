import express from 'express'
import { adminOnly, protect } from '../Middleware/AuthMiddleware.js';
import { getUserById, getUsers } from '../Controller/userController.js';

const userRoute = express.Router()

userRoute.get('/', protect, adminOnly, getUsers);
userRoute.get('/:id', protect, getUserById);

export default userRoute;