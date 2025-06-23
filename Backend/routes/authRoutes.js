import express from 'express';
import {registration,login, logout, googleLogin} from '../controller/authController.js'
const authRoutes=express.Router()

authRoutes.post("/registration",registration);
authRoutes.post("/login",login);
authRoutes.get("/logout",logout);
authRoutes.post("/googleLogin",googleLogin); //googleLogin function in your authController
export default authRoutes;