import React, { useEffect, useState } from "react"; // Import useState from React
import axios from "axios"; // Import axios for API calls
import EventContext from "./createContext.js"; // Import the context from createContext.js

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [societies, setSocieties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllEvents = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get("/api/event/getallevent", {
            withCredentials: true, 
        });
        
        setEvents(response.data.events);
        return response.status;
      } catch (err) {
        //console.error("Error fetching events:", err);
        setError(err.message || "Failed to fetch events");
        return err;
      } finally {
        setLoading(false);
      }
    };

    const fetchAllSocieties = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // console.log('Fetching Societies...');
        const response = await axios.get("/api/society/getallsociety", {
            withCredentials: true, 
        });
        //console.log(response.data.Society)
        setSocieties(response.data.Society);
      } catch (err) {
        //console.error("Error fetching Societies:", err);
        setError(err.message || "Failed to fetch Societies");
        return err
      } finally {
        setLoading(false);
      }
    };

    const fetchEvent = async (id) => {
      try {
        const response = await axios.get(`/api/event/getevent/${id}`, {
          withCredentials: true,
        });
        
        return response.data.event;
      } catch (err) {
        setError(err.message || "Failed to fetch the event");
      } finally {
        setLoading(false);
      }
    }

    

    return (
      <EventContext.Provider 
      value={{ 
        events,
        societies,
        fetchAllEvents,
        fetchAllSocieties,
        loading, 
        error, 
        fetchEvent }}>
        {children}
      </EventContext.Provider>
    );
};

