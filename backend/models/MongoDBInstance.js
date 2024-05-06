const mongoose = require("mongoose");

const MongoDBInstanceSchema = new mongoose.Schema({
    host:{
        type:String,
        required:true,
    },
    port:{
        type:Number,
        required:true,
    },
    databases:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Database'
    }]
})

module.exports = mongoose.model("MongoDBInstance",MongoDBInstanceSchema);