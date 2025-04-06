import express from 'express'
import { adminOnly } from '../Middleware/AuthMiddleware.js';
import { exportTaskReport, exportUserReport } from '../Controller/reportController.js';

const reportRoute = express.Router()

reportRoute.get('/export/tasks', adminOnly, exportTaskReport)
reportRoute.get('/export/users', adminOnly, exportUserReport)


export default reportRoute;