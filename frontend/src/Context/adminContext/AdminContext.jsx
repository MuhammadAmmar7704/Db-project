import axios from "axios";
import AdminContext from "./createContext"
import { useState } from "react";




export const AdminProvider = ({children}) =>{

    const [users, setUsers] = useState([]);

    //----------events-----------
    //create_event is in UCRContest
    const removeEvent = async (event_id) => {
        
        try {
            const response = await axios.post('/api/event/deleteevent',
                {
                    event_id
                },
                {
                    withCredentials: true
                }
            );

            alert('event deleted');

        } catch (error) {
            console.log(error);
            alert('event deletion failed');

        }
    }

    const updateEvent = async (data) => {
        
        try {
            const response = await axios.post('/api/event/updateevent',
                data
                ,
                {
                    withCredentials: true
                }
            );
            alert('event updated');
        } catch (error) {
            console.log(error);
            alert('event update failed');

        }
    }
    const addEvent = async (data) => {
        
        try {
            const response = await axios.post('/api/event/addevent',
                data,
                {
                    withCredentials: true
                }
            );

            alert('event added');

        } catch (error) {
            console.log(error);
            alert('event addition failed');

        }
    }
    //-----------------------------

    //----------------users--------

    const getAllUsers = async () => {
        try{
            const response = await axios.get('/api/auth/all',{
                withCredentials:true
            })

            setUsers(response.data.users);
        }catch(error){
            console.log(error);
        }
    }

    const removeUser = async (id) => {
        try{
            const response = await axios.post('/api/auth/removeuser',
                {user_id : id},{
                withCredentials:true
            })

            alert("user removed");
        }catch(error){
            console.log(error);
            alert('user deletion failed');

        }
    }
    //-----------------------------

    //------universities------------


    const removeUniversity = async (university_id) => {
        
        try {
            const response = await axios.post('/api/university/deleteuniversity',
                {
                    university_id
                },
                {
                    withCredentials: true
                }
            );

            alert('university deleted');

        } catch (error) {
            console.log(error);
            alert('university deletion failed');

        }
    }

    const updateUniversity = async (data) => {
        
        try {
            const response = await axios.post('/api/university/updateuniversity',
                data
                ,
                {
                    withCredentials: true
                }
            );
            alert('university updated');
        } catch (error) {
            let message ='university updation failed : '
            if (error.response && error.response.data) {  
                message += error.response.data.message;
                if (error.response.data.error && error.response.data.error.detail) {  // Check for detailed error
                  message += ` - ${error.response.data.error.detail}`;
                }
            } else {
                message += ": Internal Server error";  
            }
              alert(message);
        }
    }
    const addUniversity = async (data) => {
        
        try {
            const response = await axios.post('/api/university/adduniversity',
                data,
                {
                    withCredentials: true
                }
            );

            alert('university added');

        } catch (error) {
            console.log(error);
            let message ='university addition failed : '
            if (error.response && error.response.data) {  
                message += error.response.data.message;
                if (error.response.data.error && error.response.data.error.detail) {  // Check for detailed error
                  message += ` - ${error.response.data.error.detail}`;
                }
            } else {
                message += ": Internal Server error";  
            }
              alert(message);
        }
    }
    //------------------------------------

    //----------Societies-----------------


    const removeSociety = async (society_id) => {
        
        try {
            const response = await axios.post('/api/society/deletesociety',
                {
                    society_id
                },
                {
                    withCredentials: true
                }
            );

            alert('society deleted');

        } catch (error) {
            console.log(error);
            alert('society deletion failed');

        }
    }

    const updateSociety = async (data) => {
        
        try {
            const response = await axios.post('/api/society/updatesociety',
                data
                ,
                {
                    withCredentials: true
                }
            );
            alert('society updated');
        } catch (error) {
            console.log(error);
            let message ='society updation failed : '
            console.log(message)
            if (error.response && error.response.data) {  
                message += error.response.data.message;
                if (error.response.data.error && error.response.data.error.detail) {  // Check for detailed error
                  message += ` - ${error.response.data.error.detail}`;
                }
            } else {
                message += ": Internal Server error";  
            }
              alert(message);
        }
    }
    const addSociety = async (data) => {
        
        try {
            const response = await axios.post('/api/society/addsociety',
                data,
                {
                    withCredentials: true
                }
            );

            alert('society added');

        } catch (error) {
            console.log(error);
            let message ='society addition failed : '
            if (error.response && error.response.data) {  
                message += error.response.data.message;
                if (error.response.data.error && error.response.data.error.detail) {  // Check for detailed error
                  message += ` - ${error.response.data.error.detail}`;
                }
            } else {
                message += ": Internal Server error";  
            }
              alert(message);
        }
    }

    return(
        <AdminContext.Provider
        value={{
            removeEvent,
            addEvent,
            updateEvent,
            getAllUsers,
            users,
            removeUser,
            addUniversity,
            updateUniversity,
            removeUniversity,
            addSociety,
            updateSociety,
            removeSociety
        }}>
            {children}
        </AdminContext.Provider>
    )
}
