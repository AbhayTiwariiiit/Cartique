import React from 'react'
import { useState } from 'react';
import { useEffect, useContext } from 'react';
import { AuthDataContext } from './authContext';
import axios from 'axios';
export const UserDataContext = React.createContext();
export function UserContext({ children }) {
    let [userData, setUserData] = useState("");
    let {serverURL} = useContext(AuthDataContext);
    const getCurrentUser = async () => {
        try {
            console.log(`${serverURL}/api/user/getCurrentUser`);
            let result= await axios.get(`${serverURL}/api/user/getCurrentUser`, { withCredentials: true });
            setUserData(result.data);
        } catch (error) {
            setUserData(null);
            console.error('Error fetching current user:', error);
        }
    }  
    useEffect(() => {
        getCurrentUser();
    },[])  
    let value = {
        userData,
        setUserData,
        getCurrentUser
    }
    return (
            <UserDataContext.Provider value={value}>
                {children}
            </UserDataContext.Provider>
    )
}

export default UserContext;
