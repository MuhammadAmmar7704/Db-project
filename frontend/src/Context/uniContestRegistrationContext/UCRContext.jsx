import React, { useEffect, useState } from "react";
import axios from "axios"; 
import UCRContext from "./createContext.js";

export const UCRProvider = ({ children }) => {
  const [universities, setUniversities] = useState([]);
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all universities
  const fetchAllUniversities = async () => {
    setLoading(true);
    setError(null);

    try {
      // console.log('Fetching Universities...');
      const response = await axios.get("/api/university/getalluniversity", {
        withCredentials: true,
      });
      
      setUniversities(response.data.university);
    } catch (err) {
      console.error("Error fetching universities:", err);
      setError(err.message || "Failed to fetch universities");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all contests
  const fetchAllContests = async () => {
    setLoading(true);
    setError(null);

    try {
      //console.log('Fetching Contests...');
      const response = await axios.get("/api/contest/getallcontests", {
        withCredentials: true,
      });
      setContests(response.data.contests); // Adjust key as per API response
    } catch (err) {
      console.error("Error fetching contests:", err);
      setError(err.message || "Failed to fetch contests");
    } finally {
      setLoading(false);
    }
  };

  // Add registration
  const registerForEvent = async (eventId, userId, registrationDetails) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Registering for event...");
      const response = await axios.post(
        "/api/registration/register",
        {
          eventId,
          userId,
          ...registrationDetails,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Registration successful:", response.data);
      return response.data;
    } catch (err) {
      console.error("Error during registration:", err);
      setError(err.message || "Failed to register for the event");
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetching
  useEffect(() => {
    fetchAllUniversities();
    // fetchAllContests();
  }, []);

  return (
    <UCRContext.Provider
      value={{
        universities,
        contests,
        fetchAllUniversities,
        fetchAllContests,
        registerForEvent,
        loading,
        error,
        
      }}
    >
      {children}
    </UCRContext.Provider>
  );
};
