import React, { useContext, useState } from 'react'
import Logo from "../assets/logo.png"
import Google from "../assets/google.png"
import { useNavigate } from 'react-router-dom'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { AuthDataContext } from '../context/authContext';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/Firebase';
import { UserDataContext } from '../context/UserContext';

function Registration() {
    let navigate=useNavigate();
    let {serverURL}=useContext(AuthDataContext);
    const [show,setshow]=useState(false);
    const {getCurrentUser}=useContext(UserDataContext);
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const handleSignUp=async(e)=>{
      e.preventDefault();// didnt reload the page as it normally does
      console.log(serverURL);
      try{
        const res=await axios.post(serverURL+'/api/auth/registration',{
          name,email,password
        },{withCredentials: true});
        console.log(res);
        getCurrentUser(); // Fetch the current user data after login
        navigate("/"); // Redirect to home page after successful login
      }
      catch(error){
        console.log(error);
      }
    }
    const googleSignUp=async()=>{
      try {
        const res=await signInWithPopup(auth,provider);
        let user=res.user;
        let name=user.displayName;
        let email=user.email;
        const result=await axios.post(serverURL+'/api/auth/googleLogin',{
          name,email
        },{withCredentials: true});
        getCurrentUser(); // Fetch the current user data after login
        navigate("/"); // Redirect to home page after successful login
        console.log(result);
      }
      catch (error) {
        console.error("Google Sign Up Error:", error);
      }
    }
  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] ">
        <div className="px-6 py-4 relative max-w-7xl mx-auto flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
            <img src={Logo} alt="" />
          </div>
          <span className="text-xl font-semibold text-white">OneCart</span>
        </div>
      <div className=' text-white flex flex-col items-center justify-start'>
        <div className='w-[100%] h-[100px] flex items-center justify-start flex-col gap-[10px]'>
          <span className='text-[25px] font-semibold'> Signup</span>
          <span>Welcome to OneCart,Place your Order</span>
        </div>
        <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center ' >
          <form action="" onSubmit={handleSignUp} className='w-[90%] h-[90%] flex flex-col items-center gap-[20px]'>
              <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer'  onClick={googleSignUp}>
                  <img src={Google} alt="" className='w-[20px]'/> Signup with Google
              </div>
              <div className='w-[100%] h-[20px] flex items-center justify-center gap-[20px]' >
                  <div className='w-[40%] h-[1px] bg-[#96969635]'></div>OR<div className='w-[40%] h-[1px] bg-[#96969635]'></div>                    
              </div>
              <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px]'>
                  <input type="text" value={name} onChange={(e)=>setname(e.target.value)} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Username' required  />
                  <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required  />
                  <input type={show ? 'text' :'password'} value={password} onChange={(e)=>setpassword(e.target.value)} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required  />     
                  {!show&&<IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[740px]' onClick={()=>setshow(prev=>!prev)}/>}       
                  {show&&<IoEyeSharp className='w-[20px] h-[20px] cursor-pointer absolute right-[740px]' onClick={()=>setshow(prev=>!prev)}/>}       
                  <button  className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Create Account</button>
                  <p className='flex gap-[10px]'>Do you have any Account?
                      <span className='text-[17px] text-[#5555f6cf] font-semibold cursor-pointer' onClick={()=>navigate("/login")}>Login</span>
                  </p>
              </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Registration
