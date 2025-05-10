import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './Route/authRoute.js';
import userRoute from './Route/userRoute.js';
import taskRoute from './Route/taskRoute.js';
import reportRoute from './Route/reportRoute.js';
import path from 'path';
import connectDB from './Config/db.js';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
connectDB();

app.use(cors({
    origin: process.env.CLIENT_SERVER || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json())

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/task', taskRoute);
app.use('/report', reportRoute);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})