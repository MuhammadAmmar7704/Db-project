import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddContest = ({  }) => {
  const {eventId} = useParams();
  const [contestName, setContestName] = useState("");
  const [participants, setParticipants] = useState("");
  const navigate = useNavigate();

  const handleAddContest = async () => {
    try {
      const response = await axios.post("/api/contest/addcontest", {
        event_id: eventId,
        contest_name: contestName,
        participants: participants,
      },{
        withCredentials: true
      });

      if (response.status === 201) {
        alert('added contest');
        navigate(`/adminview/events`);
      }
    } catch (error) {
        alert('failed to add contest');
      console.error("Error adding contest:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Add New Contest</h1>

      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
        <div className="mb-4">
          <label htmlFor="contest_name" className="block text-gray-700 font-medium">
            Contest Name
          </label>
          <input
            type="text"
            id="contest_name"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={contestName}
            onChange={(e) => setContestName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="participants" className="block text-gray-700 font-medium">
            Maximum Participants
          </label>
          <input
            type="number"
            id="participants"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleAddContest}
            className="bg-green-500 text-white px-6 py-2 rounded-md"
          >
            Add Contest
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContest;
