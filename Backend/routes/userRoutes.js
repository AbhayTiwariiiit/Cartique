import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { getCurrentUser } from '../controller/userController.js';

const userRoutes=express.Router();

userRoutes.get("/getCurrentUser",isAuth,getCurrentUser); //get current user
export default userRoutes;