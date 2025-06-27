import React, { useContext, useState } from 'react'
import Logo from "../assets/logo.png"
import Google from "../assets/google.png"
import { useNavigate } from 'react-router-dom'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { AuthDataContext } from '../context/authContext';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/Firebase';

function Login() {
  let { serverURL } = useContext(AuthDataContext);
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  let { getCurrentUser } = useContext(UserDataContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(serverURL + "/api/auth/login", {
        email, password
      }, { withCredentials: true });
      getCurrentUser(); // Fetch the current user data after login
      navigate("/"); // Redirect to home page after successful logi
    }
    catch (error) {
      console.error("login error:", error);
    }
  }
  const googleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      let user = res.user;
      let name = user.displayName;
      let email = user.email;
      const result = await axios.post(serverURL + '/api/auth/googleLogin', {
        name, email
      }, { withCredentials: true });
      getCurrentUser(); // Fetch the current user data after login
      navigate("/"); // Redirect to home page after successful login
      console.log(result);
    }
    catch (error) {
      console.error("Google Sign Up Error:", error);
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      <div className="px-6 py-4 relative max-w-7xl mx-auto flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
          <img src={Logo} alt="" />
        </div>
        <span className="text-xl font-semibold text-white">OneCart</span>
      </div>
      <div className=' text-white flex flex-col items-center justify-start'>

        <div className='w-[100%] h-[100px] flex items-center justify-start flex-col gap-[10px]'>
          <span className='text-[25px] font-semibold'> Login</span>
          <span>Welcome to OneCart,Place your Order</span>
        </div>
        <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center ' >
          <form action="" onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center gap-[20px]'>
            <div onClick={googleLogin} className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer'>
              <img src={Google} alt="" className='w-[20px]' /> Login with Google
            </div>
            <div className='w-[100%] h-[20px] flex items-center justify-center gap-[20px]' >
              <div className='w-[40%] h-[1px] bg-[#96969635]'></div>OR<div className='w-[40%] h-[1px] bg-[#96969635]'></div>
            </div>
            <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px]'>
              <input type="text" value={email} onChange={(e) => setemail(e.target.value)} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required />
              <input type={show ? 'text' : 'password'} value={password} onChange={(e) => setpassword(e.target.value)} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required />
              {!show && <IoEyeOutline className='w-[20px] h-[20px] bottom-[51%] cursor-pointer absolute right-[740px]' onClick={() => setshow(prev => !prev)} />}
              {show && <IoEyeSharp className='w-[20px] h-[20px] cursor-pointer bottom-[51%] absolute right-[740px]' onClick={() => setshow(prev => !prev)} />}
              <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Login</button>
              <p className='flex gap-[10px]'>Create Account
                <span className='text-[17px] text-[#5555f6cf] font-semibold cursor-pointer' onClick={() => navigate("/signup")}>Signup</span>
              </p>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login
