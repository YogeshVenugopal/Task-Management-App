import express from 'express'
import { getUserProfile, login, register, updateUserProfile } from '../Controller/authController.js'
import { protect }from '../Middleware/AuthMiddleware.js'
import upload from '../Middleware/uploadMiddleware.js'

const authRoute = express.Router()

authRoute.post('/login', login)
authRoute.post('/signup', register) 
authRoute.get('/profile', protect, getUserProfile)
authRoute.put('/profile', protect, updateUserProfile)


authRoute.post('/upload-image', upload.single('image'), async (req, res) => {
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"});
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.status(200).json({ imageUrl });
})

export default authRoute;