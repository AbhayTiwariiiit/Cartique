import User from "../model/userModel.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken ,genTokenAdmin} from "../config/token.js";

export const registration= async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const existUser=await User.findOne({email});
        if(existUser){
            return res.status(400).json({message: "User Already Existed"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message: "Invalid Email"});
        }
        if(password.length<8){
            return res.status(400).json({message: "Password must be at least 8 characters"});
        }
        let hashPassword=await bcrypt.hash(password,10);
        const user=await User.create({name,email,password: hashPassword});
        let token=await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge: 15 * 60 * 1000, 
            secure: false,// When true, the cookie is only sent over HTTPS.Here it’s false, so the cookie will be sent over plain HTTP as well (common in local development). In production, you usually set secure: true so that your token is never sent over an unencrypted connection
            sameSite: "strict",
        });
        res.status(201).json(user);
    }
    catch(error){
        console.log("registration error")
        console.log(error);
        return res.status(500).json({message: "registration error"})
    }
}
export const login=async(req,res)=>{
    try{
        let {email,password}=req.body;
        let user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        let isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message: "Incorrect Password"});
        }
        let token=await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge: 900000, 
            secure: false,// When true, the cookie is only sent over HTTPS.Here it’s false, so the cookie will be sent over plain HTTP as well (common in local development). In production, you usually set secure: true so that your token is never sent over an unencrypted connection
            sameSite: "strict",
        });
        res.status(201).json({message: "Login Successfull"});
    }
    catch(error){
        console.log("Login Error");
        res.status(500).json({message: "Login Error"});
    }
}

export const logout=async(req,res)=>{
    try{
        res.clearCookie("token");
        res.status(200).json({message: "Logged out successfully"});
    }
    catch(error){
        console.log("Logout Error");
        res.status(500).json({message: "Logout Error"});
    }
}

export const googleLogin=async(req,res)=>{
    try{
        let {name,email}=req.body;
        let user=await User.findOne({email});
        if(!user){
            user=await User.create({name,email});
        }
        let token=await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge: 900000, 
            secure: false,// When true, the cookie is only sent over HTTPS.Here it’s false, so the cookie will be sent over plain HTTP as well (common in local development). In production, you usually set secure: true so that your token is never sent over an unencrypted connection
            sameSite: "strict",
        })
        res.status(201).json({message: "Login Successfull"});        
    }
    catch(error){
        console.log("Google Login Error");
        res.status(500).json({message: "Google Login Error"});
    }
}

export const adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            let token=await genTokenAdmin(email);
            res.cookie("token",token,{
                httpOnly:true,
                maxAge: 900000, 
                secure: false,// When true, the cookie is only sent over HTTPS.Here it’s false, so the cookie will be sent over plain HTTP as well (common in local development). In production, you usually set secure: true so that your token is never sent over an unencrypted connection
                sameSite: "strict",
            });
            return res.status(200).json({message: "Admin Login Successfull"});
        }
        return res.status(400).json({message: "Invalid Admin Credentials"});
    }
    catch(error){
        console.log("Admin Login Error");
        res.status(500).json({message: "Admin Login Error"});
    }
}
