import axios from "axios";
import UserContext from "./createContext.js";
import { useEffect, useState } from "react";

export const UserProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        setIsAuthenticated(!!userId);
      }, []);

    const login =async (cred) => {
        try {
            
            const response = await axios.post('api/auth/login',
                {
                    email:cred.email,
                    password:cred.password
            },{
                withCredentials: true,
            },)
            localStorage.setItem('user_id', response.data.id)
            localStorage.setItem('role_name', response.data.role_name)
            if(response.data.university_id)
                localStorage.setItem('university_id', response.data.university_id)

            if(response.data.society_id)
                localStorage.setItem('society_id', response.data.society_id)

            setIsAuthenticated(true);
            return response.status;

        } catch (error) {
            return error.status;
        }
    }

    const signup =async (cred) => {
        try {
            
            const response = await axios.post('api/auth/signup',
                {
                    email:cred.email,
                    password:cred.password,
                    username:cred.username,
                    university_id:cred.university_id,
            },{
                withCredentials: true,
            },)

            return response.status;

        } catch (error) {
            return error;
        }
    }

    const logOut = async () => {
        try {
            
            const response = await axios.post('api/auth/logout',
            {},{
                withCredentials: true,
            })


            setIsAuthenticated(false);
            localStorage.removeItem('role_name');
            localStorage.removeItem('user_id');
            localStorage.removeItem('university_id');
            
            
            return response.status;

        } catch (error) {
            return error;
        }
    }
  
  
    return (
        <UserContext.Provider value= {{
            login,
            signup,
            logOut,
            isAuthenticated,
        }}>
        {children}
        </UserContext.Provider>
  )
}
