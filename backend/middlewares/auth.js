const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req,res,next)=>{
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
        // console.log("TOKEN",token);
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            });
        }

        try {
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            // console.log(decode);
            req.user = decode;
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            });
        }
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Error Occurred while validating token"
        })
    }
}

exports.isUser = async (req,res,next) =>{
    try {
        const userDetails = await User.findOne({email:req.user.email});
        if(userDetails.role !== "user"){
            return res.status(501).json({
                success:false,
                message:"This is a protected route for user only"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cant be verified,"
        })
    }
};

exports.isAdmin = async (req,res,next) =>{
    try {
        const userDetails = await User.findOne({email:req.user.email});
        // console.log("user details",userDetails);
        if(userDetails.role !== "admin"){
            return res.status(501).json({
                success:false,
                message:"This is a protected route for admin only"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Admin role cant be verified,"
        })
    }
};

