import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventContext from "../../Context/eventContext/createContext.js"; // Import the Event context
import ContestContext from "../../Context/uniContestRegistrationContext/createContext.js"; // Import the Contest context

const EventPage = () => {
  const { id } = useParams(); // Get the `id` from the URL
  const { fetchEvent, loading: eventLoading, error: eventError } = useContext(EventContext); // Use context to fetch the event
  const {contests, setContests,fetchContestsByEventId, registerForContest, loading: contestLoading, error: contestError,
    countRegistration, getContestParticipants
   } = useContext(ContestContext); // Use context to fetch and register contests
  const [event, setEvent] = useState(null);
  const [selectedContest, setSelectedContest] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const loadEventData = async () => {
      const eventData = await fetchEvent(id); // Fetch the event details
      setEvent(eventData[0]);
      let d = new Date(eventData[0].event_date).toUTCString();
      setDate(d);
      //console.log(eventData)
    };

    const loadContests = async () => {
      await fetchContestsByEventId(id);
    };

    loadEventData();
    loadContests();
  }, [id]);

  const handleRegister = async () => {
    if (!selectedContest) {
      alert("Please select a contest to register.");
      return;
    }

    try {

      const data = await countRegistration(selectedContest);
      const maxPar = await getContestParticipants(selectedContest);
    
      if (data.count >= maxPar) {
        alert('Teams are Full. Your LOSS!');
        return;
      }
      //user id will be stored in local storage

      const userId = localStorage.getItem('user_id');
      await registerForContest(selectedContest, userId);

      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
      alert('Registration failed. Please try again');
    }
  };

  return (
    <>
    {(eventLoading || contestLoading) && <p>Loading...</p>}
    {(eventError) && <p>Error: {eventError}</p>}
    {(contestError ) && <p>Error: {contestError}</p>}

    {
    event && (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
        {/* Event Details */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          {event.name}
        </h1>
        <div className="flex flex-col items-center">
          <img
            src={event.image_url}
            alt={event.event_name}
            className="w-full max-h-72 object-cover rounded-md mb-4 shadow-md"
          />
          <p className="text-gray-700 text-center mb-6">{event.description}</p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-semibold">Name:</span>
            <span className="text-gray-800">{event.event_name}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-semibold">Date of Event:</span>
            <span className="text-gray-800">{date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">Society ID:</span>
            <span className="text-gray-800">{event.society_id}</span>
          </div>
        </div>

        {/* Contests Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contests</h2>
          {contests && <div>
            { contests.length > 0 ? (
            <ul className="space-y-4">
              {contests.map((contest) => (
                <li
                  key={contest.contest_id}
                  className="p-4 bg-gray-100 rounded-md shadow-md"
                >
                  <p>
                    <strong>Contest Name:</strong> {contest.contest_name}
                  </p>
                  <p>
                    <strong>Participants:</strong> {contest.participants}
                  </p>
                  <p>
                    <strong>Description:</strong> {contest.description || "N/A"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No contests available for this event.</p>
          )}
          </div>}
        </div>

        {/* Registration Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Register for a Contest
          </h3>
          <div className="flex space-x-4 items-center">
            <select
              value={selectedContest || ""}
              onChange={(e) => setSelectedContest(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="" disabled>
                Select a contest
              </option>
              {contests && contests.map((contest) => (
                <option key={contest.contest_id} value={contest.contest_id}>
                  {contest.contest_name}
                </option>
              ))}
            </select>
            <button
              onClick={handleRegister}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    )}
      </>
  );
};

export default EventPage;
