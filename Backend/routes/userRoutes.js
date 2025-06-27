import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { getCurrentUser } from '../controller/userController.js';
import { adminAuth } from '../middleware/adminAuth.js';
import { getAdmin } from '../controller/adminController.js';

const userRoutes=express.Router();

userRoutes.get("/getCurrentUser",isAuth,getCurrentUser); //get current user
userRoutes.get("/getAdmin",adminAuth,getAdmin); //get admin details
export default userRoutes;