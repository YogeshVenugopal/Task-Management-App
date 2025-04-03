import User from "../Model/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const register = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl, adminInviteToken } = req.body;      

        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const isUserExist = await User.findOne({ email });
        
        if(isUserExist){
            return res.status(400).json({message:"User already exist"});
        }

        let role = "member";

        if(adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN){
            role = "admin";
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            uploadImage: profileImageUrl
        });

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
            message:"User created successfully"      
        })

    } catch (error) {
        res.status(500).json({message:"Internal server error", error:error});
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
    
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
    
        const user  = await User.findOne({email});
    
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
    
        const isMatch = await bcryptjs.compare(password, user.password);
    
        if(!isMatch){
            return res.status(400).json({message:"Invalid Username or Password"});
        }
    
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
            message:"User logged in successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error", error:error});
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        return res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error", error:error});
    }
}

export const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);

    if(!user){
        return res.status(400).json({message:"User not found"});
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if(req.body.password){
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(req.body.password, salt);
    }

    const updateUser = await user.save();

    res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        token: generateToken(updateUser._id),
        message:"User updated successfully"
    })
}