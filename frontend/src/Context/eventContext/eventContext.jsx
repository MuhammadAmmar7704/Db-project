import React, { useEffect, useState } from "react"; // Import useState from React
import axios from "axios"; // Import axios for API calls
import EventContext from "./createContext.js"; // Import the context from createContext.js

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllEvents = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching events...');
        const response = await axios.get("/api/event/getallevent", {
            withCredentials: true, 
        });
        
        setEvents(response.data.events);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    return (
      <EventContext.Provider value={{ events, fetchAllEvents, loading, error }}>
        {children}
      </EventContext.Provider>
    );
};

