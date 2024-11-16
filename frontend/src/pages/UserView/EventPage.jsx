import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventContext from "../../Context/eventContext/createContext.js"; // Import the context

const EventPage = () => {
  const { id } = useParams(); // Get the `id` from the URL
  const { fetchEvent, loading, error } = useContext(EventContext); // Use context to fetch the event
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const loadEvent = async () => {
      const eventData = await fetchEvent(id); // Fetch the event details
      setEvent(eventData[0]);
    };

    loadEvent();
  }, []);

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    event && (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          {event.name}
        </h1>
        <div className="flex flex-col items-center">
          {/* Image */}
          <img
            src={event.image_url}
            alt={event.event_name}
            className="w-full max-h-72 object-cover rounded-md mb-4 shadow-md"
          />
          {/* Description */}
          <p className="text-gray-700 text-center mb-6">
            {event.description}
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-semibold">University:</span>
            <span className="text-gray-800">{event.university}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-semibold">Admin:</span>
            <span className="text-gray-800">{event.admin}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">Society ID:</span>
            <span className="text-gray-800">{event.society_id}</span>
          </div>
        </div>
      </div>
    )
  );
};

export default EventPage;
