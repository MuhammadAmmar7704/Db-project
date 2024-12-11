import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import AdminContext from "../../Context/adminContext/createContext.js";
import UCRContext from "../../Context/uniContestRegistrationContext/createContext.js";

const AdminContestPage = () => {
  const { eventId } = useParams(); // Get eventId from the URL
  //const { removeContest } = useContext(AdminContext);
  const { contests, fetchContestsByEventId } = useContext(UCRContext);
  const [currContests, setCurrContests] = useState([]);

  const removeContest = async (id) => {
    try {
        const response = await axios.post("/api/contest/deletecontest", {
          contest_id: id,
        },{
          withCredentials: true
        });
  
        if (response.status === 201) {
          alert('deleted contest');
        }
      } catch (error) {
          alert('failed to delete contest');
        console.error("Error adding contest:", error);
      }
  }
  const deleteContest = async (id) => {
    await removeContest(id);
    fetchContestsByEventId(eventId);
  };

  useEffect(() => {
        setCurrContests(contests); 
  }, [contests]);


  useEffect(() => {
    const loadContests = async () => {
      const res = await fetchContestsByEventId(eventId);
      setCurrContests(contests);
    };
    loadContests();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Admin Contests</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-h-96 overflow-y-auto">
        {currContests.map((contest) => (
          <div
            key={contest.contest_id}
            className="bg-white shadow-md rounded-md p-4"
          >
            <h2 className="text-lg font-bold">{`id - ${contest.contest_id}`}</h2>
            <h2 className="text-lg font-bold">{contest.contest_name}</h2>
            <p className="text-gray-600 mb-2">{contest.description}</p>
            <p className="text-gray-800">{`Participants: ${contest.participants}`}</p>
            
            <button
              onClick={() => deleteContest(contest.contest_id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <Link
          to='addcontest'
          className="bg-green-500 text-white px-6 py-2 rounded-md"
        >
          Add Contest
        </Link>
      </div>
    </div>
  );
};

export default AdminContestPage;
