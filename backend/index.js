const express =require("express");
require("dotenv").config();
const cors = require("cors");
const { connect } = require("./config/database");
const app = express();
const PORT = process.env.PORT;
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:"https://deployed-flipr.vercel.app",
    credentials:true,
    optionsSuccessStatus:200,
}
));
app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Server is running...."
    })
})
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/build/index.html"))
    
    return res.json({
        success:true,
        message:"Your server is up and running...."
    })
})

app.listen(PORT,()=>{
    connect();
    console.log("Server is running at PORT:",PORT);
})