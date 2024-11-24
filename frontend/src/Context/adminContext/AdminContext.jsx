import axios from "axios";
import AdminContext from "./createContext"




export const AdminProvider = ({children}) =>{
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
        }
    }

    

    return(
        <AdminContext.Provider
        value={{
            removeEvent,
            addEvent,
            updateEvent,
        }}>
            {children}
        </AdminContext.Provider>
    )
}
