import axios from "axios";
import UserContext from "./createContext";

export const UserProvider = ({ children }) => {
  
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
        }}>
        {children}
        </UserContext.Provider>
  )
}
