const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:['admin','user'],
        required:true,
    },
    accessRoles:[{
        database:{type:mongoose.Schema.Types.ObjectId, ref:'Database'},
        role:{type:String, enum:['read','edit'],default:'read'}
    }],
    token:{
        type:String
    }
})

module.exports = mongoose.model("User",UserSchema);
