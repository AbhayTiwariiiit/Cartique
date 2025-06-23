import express from 'express'
import dotenv from 'dotenv'
import connectdb from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
dotenv.config(); //configure dotenv

let port=process.env.PORT||6000; //if port doesnt work tehn 6000

let app = express();
app.use(express.json()); //to parse json data
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true 
}))
app.use("/api/auth",authRoutes);//auth routes
app.use("/api/user",userRoutes); //user routes
app.get('/',(req,res)=>{
    res.send("hello From Server");
});

app.listen(port,()=>{
    console.log("Hello From Server ");
    connectdb();    
});