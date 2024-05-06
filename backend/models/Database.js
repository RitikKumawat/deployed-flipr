const mongoose = require("mongoose");

const DatabaseSchema = new mongoose.Schema({
    name:{
        type:String, 
        unique:true,
        required:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    users:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
});


module.exports = mongoose.model("Database",DatabaseSchema);
