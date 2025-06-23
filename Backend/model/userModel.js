import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
    },
    cartData:{
        type: Object,
        default: {} //Empty Object
    }
},{timestamps: true,minimize: false}) // minimize option is used to control whether empty objects should be saved in the database.

const User=mongoose.model("User",userSchema);
export default User;