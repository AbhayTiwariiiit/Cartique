import User from "../model/userModel.js";
export const getCurrentUser=async(req,res)=>{
    try{
        let user=await User.find({_id: req.userId}).select("-password"); //find user by userId
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({message: "User found", user: user}); //return user data without password
    }
    catch(error){
        console.log("Error in getCurrentUser");
        res.status(500).json({message: "Error in getCurrentUser"});
    }   
}