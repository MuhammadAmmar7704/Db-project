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

  // Fetch contests by event ID
const fetchContestsByEventId = async (eventId) => {
  setLoading(true);
  setError(null);

  try {
    console.log('fetching bro');
    const response = await axios.get(`/api/contest/getcontestofevent/${eventId}`, {
      withCredentials: true,
    });
    
    console.log('after contest = ', response.data.contests);
    setContests(response.data.contests);
  } catch (err) {
    console.error("Error fetching contests:", err);
    setError(err.message || "Failed to fetch contests");
  } finally {
    setLoading(false);
  }
};

// Register for a contest
const registerForContest = async (contestId, userId) => {
  setLoading(true);
  setError(null);
  try {
    const response = await axios.post(
      "/api/contest/register",
      {
        contest_id: contestId,
        user_id: userId,
      },
      {
        withCredentials: true,
      }
    );

    return response.data; 
  } catch (err) {
    setError(err.message || "Failed to register for the contest");
    throw err; 
  } finally {
    setLoading(false);
  }
};


//count register
const countRegistration = async (contestId) => {
  try {
    const response = await axios.post(
      "/api/contest/countregistration",
      {
        contest_id: contestId,
      },
      {
        withCredentials: true,
      },
      
    );
    return response.data; 
  } catch (err) {
    setError(err.message || "Failed to count registerations for the contest");
    throw err; 
  }
};


//get contest
const getContestParticipants = async (contestId) => {
  try {
    const response = await axios.get(
      `/api/contest/${contestId}`,
      {
        withCredentials: true,
      },
    );

    return response.data.contest.participants; 
  } catch (err) {
    setError(err.message || "Failed to get contest");
    throw err; 
  }
};


  return (
    <UCRContext.Provider
      value={{
        universities,
        contests,
        setContests,
        fetchAllUniversities,
        fetchContestsByEventId,
        registerForContest,
        getContestParticipants,
        countRegistration,
        loading,
        error,
        
      }}
    >
      {children}
    </UCRContext.Provider>
  );
};
