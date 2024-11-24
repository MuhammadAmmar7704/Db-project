import axios from "axios";
import UserContext from "./createContext";
import { useEffect, useState } from "react";

export const UserProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        setIsAuthenticated(!!userId); // Set based on user_id presence
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
