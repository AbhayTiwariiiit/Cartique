import React from 'react'
export const adminDataContext = React.createContext();
import { useState,useContext,useEffect } from 'react';
import axios from 'axios';
import { authDataContext } from './AuthContext';
function AdminContext({children}) {
  const [adminData, setAdminData] = useState(null);
    let {serverURL}=useContext(authDataContext);
    const getAdminData = async () => {
      try {
        let result=await axios.get(`${serverURL}/api/user/getAdmin`, {
          withCredentials: true
        })
        console.log(result);
        setAdminData(result.data);
        console.log("Admin data fetched:", result.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } 
    }
    useEffect(() => {
      getAdminData();
    }, []);
    let value={
      getAdminData,adminData,setAdminData
    }
  return (
    <div>
      <adminDataContext.Provider value={value}>
        {children}
      </adminDataContext.Provider>
    </div>
  )
}

export default AdminContext
