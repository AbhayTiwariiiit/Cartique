import { useContext, useState } from 'react'
import Logo from "../assets/logo.png"
import Google from "../assets/google.png"
import { useNavigate } from 'react-router-dom'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import axios from 'axios';

function Login() {
  let { serverURL } = useContext(authDataContext);
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const {getAdminData, setAdminData} = useContext(adminDataContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(serverURL + "/api/auth/adminLogin", {
        email, password
      }, { withCredentials: true });
      console.log("login response:", res);
      getAdminData(); // Fetch admin data after login
      navigate("/"); // Redirect to home page after successful logi
    }
    catch (error) {
      console.error("login error:", error);
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
          <span>Welcome to OneCart,Sign-in for Admin</span>
        </div>
        <div className='max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center ' >
          <form action="" onSubmit={handleLogin} className='w-[90%] h-[70%] flex flex-col items-center gap-[20px]'>
            <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px]'>
              <input type="text" value={email} onChange={(e) => setemail(e.target.value)} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required />
              <input type={show ? 'text' : 'password'} value={password} onChange={(e) => setpassword(e.target.value)} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required />
              {!show && <IoEyeOutline className='w-[20px] h-[20px] bottom-[51%] cursor-pointer absolute right-[740px]' onClick={() => setshow(prev => !prev)} />}
              {show && <IoEyeSharp className='w-[20px] h-[20px] cursor-pointer bottom-[51%] absolute right-[740px]' onClick={() => setshow(prev => !prev)} />}
              <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Login</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login
