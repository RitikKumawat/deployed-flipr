const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.signUp = async(req,res)=>{
    try {
        const {username,email,password,confirmPassword,role} = req.body;
        if(!username || !email || !password || !confirmPassword || !role){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords do not match.."
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            username,
            email,
            password:hashedPassword,
            role
        })

        return res.status(200).json({
            success:true,
            message:"user is registered successfully",
            user,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User can't be registerd. Please try again"
        })
    }
}

exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered"
            })
        }

        const match = await bcrypt.compare(password,user.password);
        if(match){
            const payload = {
                email:user.email,
                id:user._id,
                role:user.role,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h",
            })
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully",
            })
        }else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Login failure, please try again"
        })
    }
}

exports.changePassword = async(req,res)=>{
    try {
        const { email, currentPassword, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: "Incorrect current password" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success:true,
            message:"Password updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}