
const { default: mongoose } = require("mongoose");
const MongoDBInstance = require("../models/MongoDBInstance");
const User = require("../models/User");
const Database = require("../models/Database");
const bcrypt = require("bcrypt");
exports.createInstance = async(req,res)=>{
    try {
        const {host,port} = req.body;
        // console.log("PORT",port);
        // console.log("HOST",host);
        // console.log("BODY",req.body);
        
        if(!host || !port){
            return res.status(401).json({
                success:false,
                message:"Please fill the necessary information"
            })
        }
        const mongoInstance = new MongoDBInstance({
            host,
            port,
        });

        await mongoInstance.save();
        return res.status(201).json({
            success:true,
            message:"Mongo Db instance added successfully",mongoInstance
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}


exports.createDatabase = async(req,res)=>{
    try {
        const ownerId = req.user.id;
        const {dbName,instanceId} = req.body;

        if(!dbName || !ownerId){
            return res.status(403).json({
                success:false,
                message:"Required fields are missing"
            })
        }
        const db = new Database({
            name:dbName,
            owner:ownerId
        })
        await db.save();
        const instance = await MongoDBInstance.findById(instanceId);
        instance.databases.push(db._id);
        await instance.save();
        return res.status(200).json({
            success:true,
            message:"Database created",
            db
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.pushDatabaseToInstance = async(req,res)=>{
    try {
        const {port,dbName} = req.body;

        if(!port || !dbName){
            return res.status(403).json({
                success:false,
                message:"Please mention the port number"
            })
        }
        const instance = await MongoDBInstance.findOne({port});
        const database = await Database.findOne({name:dbName});
        if(!instance){
            return res.status(404).json({
                success:false,
                message:"No instance with the specified port found"
            })
        }
        if(!database){
            return res.status(404).json({
                success:false,
                message:"No database found"
            })
        }
        instance.databases.push(database._id);
        await instance.save();
        return res.status(200).json({
            success:true,
            message:"Database pushed into instance",
            instance
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
exports.getInstances = async(req,res)=>{
    try {
        const instances = await MongoDBInstance.find().populate({path:"databases",populate:"users"});

        return res.status(200).json({
            success:true,
            message:"Instances fetched successfully",
            instances
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }   
}
exports.fetchDatabases = async(req,res)=>{
    try {
        const {instanceId} = req.body;
        const db = await MongoDBInstance.findById(instanceId).populate({path:"databases",populate:"users"});
        return res.status(200).json({
            success:true,
            message:"Fetched successfully",
            db
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
exports.removeDatabase = async(req,res)=>{
    try {
        const{dbName} = req.body;
        const database = await Database.findOne({name:dbName});
        
        if(!database){
            return res.status(404).json({
                success:false,
                message:"No database found"
            })
        }
        const usersInDb = database.users;
        for(const userId of usersInDb){
            await User.findByIdAndUpdate(userId,{
                $pull:{accessRoles:{database:database._id}}
            })
        }
        const instances = await MongoDBInstance.find({databases:database._id});
        for (const instance of instances) {
            await MongoDBInstance.findByIdAndUpdate(instance._id, {
                $pull: { databases: database._id }
            });
        }
        await Database.findByIdAndDelete(database._id);

        return res.status(200).json({ 
            success: true,
            message: "Database deleted successfully" 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.assignAccessRoles = async(req,res)=>{
    try { 
        const{email,databaseName,accessRole} = req.body;
        console.log("email",email)
        const userDetails = await User.findOne({email});
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        const database = await Database.findOne({name:databaseName}).populate({path:"users",populate:{path:"accessRoles"}});
        if(!database){
            return res.status(404).json({
                success:false,
                message:"Database not found",
            })
        }
        const existingAccessRoleIndex = userDetails.accessRoles.findIndex(role => String(role.database) === String(database._id));
        if (existingAccessRoleIndex !== -1) {
            userDetails.accessRoles[existingAccessRoleIndex].role = accessRole;
        } else {
            userDetails.accessRoles.push({ database: database._id, role: accessRole });
        }

        await userDetails.save();
        await database.save();
        return res.status(200).json({
            success:true,
            message:"Role assigned successfully",
            userDetails
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}

exports.removeUser = async(req,res)=>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        } 
        await Database.updateMany({users:user._id},
            {$pull:{users:user._id}}
        )

        await User.findByIdAndDelete(user._id);
        return res.status(200).json({
            success:true,
            message:"User removed from the system"
        })
    } catch (error) {
        
    }
}

exports.removeAccessUserFromDatabase = async(req,res)=>{
    try {
        const {email,dbName} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        const database = await Database.findOne({name:dbName});
        if(!database){
            return res.status(404).json({
                success:false,
                message:"Database not found"
            })
        }
        database.users.pull(user._id);
        await database.save();

        await User.findByIdAndUpdate(user._id,{
            $pull:{accessRoles:{database:database._id}}
        });
        return res.status(200).json({
            success:true,
            message:"User removed from the database"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.addUser = async(req,res)=>{
    try {
        const {email,dbName} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        const database = await Database.findOne({name:dbName});
        if(!database){
            return res.status(404).json({
                success:false,
                message:"Database not found"
            })
        }
        if(database.users.includes(user._id)){
            return res.status(402).json({
                success:false,
                message:"User is already in the database"
            })
        }
        database.users.push(user._id);
        await database.save();
        await User.findByIdAndUpdate(user._id,{
            $push:{accessRoles:{database:database._id}}
        })
        await user.save();

        return res.status(200).json({
            success:true,
            message:"User added to the database"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.createUser = async(req,res)=>{
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
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}