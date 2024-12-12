import React, { useContext } from "react";
import CardContainer from "./CardContainer";
import EventContext from "../../Context/eventContext/createContext.js";
import { Box } from "@mui/material";

const ViewAllEvents = () => {
  const { events, loading, error } = useContext(EventContext);

  const today = new Date();
  const upcomingEvents = events.filter(
    (event) => new Date(event.event_date) >= today
  );
  const pastEvents = events.filter(
    (event) => new Date(event.event_date) < today
  );

  return (
    <Box
      className="px-6 py-8"
      Box
      sx={{
        background: "#E8E8E8",
        minHeight: "100vh",
      }}
    >
      <div className="py-10">
        {loading && <p>Loading events...</p>}
        {error && <p>Error: {error}</p>}

        {/* Upcoming Events Section */}
        <div className="w-full mb-12">
          <h2 className="text-4xl font-semibold text-center text-gray-600 mb-6">
            UPCOMING EVENTS
          </h2>
          <div className="w-full">
            <CardContainer events={upcomingEvents} />
          </div>
        </div>

        {/* Past Events Section */}
        <div className="w-full mb-12">
          <h2 className="text-4xl font-semibold text-center text-gray-600 mb-6">
            RECENT EVENTS
          </h2>
          <div className="w-full">
            <CardContainer events={pastEvents} />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ViewAllEvents;
