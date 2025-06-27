import React, { useState ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/logo.png';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';


export default function Nav() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
    const {serverURL} = useContext(authDataContext);    
  const handleLogout = async() => {
    // clear auth tokens or context
    try{
        const res=await axios.get(serverURL+'/api/auth/logout', { withCredentials: true });
        console.log("logout response:", res);
        navigate('/login');
    }
    catch(error){
        console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-l from-[#141414] to-[#0c2025] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/') }>
            <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
              <img src={Logo} alt="OneCart logo" className="w-5 h-5" />
            </div>
            <span className="ml-2 text-xl font-semibold text-white">OneCart</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-gradient-to-l from-[#141414] to-[#0c2025] px-2 pt-2 pb-3 space-y-1">
          <button
            onClick={handleLogout}
            className="block w-full text-left text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-base font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
