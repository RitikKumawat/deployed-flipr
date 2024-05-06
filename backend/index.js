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
    origin:"http://localhost:3000",
    credentials:true
}
));

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Server is running...."
    })
})
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);


app.listen(PORT,()=>{
    connect();
    console.log("Server is running at PORT:",PORT);
})