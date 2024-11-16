import React, { useContext, useEffect } from 'react';
import CardContainer from './CardContainer';
import EventContext from '../../Context/eventContext/createContext.js'; 

const ViewAllEvents = () => {
  const { events, fetchAllEvents, loading, error } = useContext(EventContext);

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const today = new Date();
  const upcomingEvents = events.filter(event => new Date(event.event_date) >= today);
  const pastEvents = events.filter(event => new Date(event.event_date) < today);

  
  return (
    <div className="py-10">
      {loading && <p>Loading events...</p>}
      {error && <p>Error: {error}</p>}

      {/* Upcoming Events Section */}
      <div className="w-full mb-12">
        <h2 className="text-4xl font-semibold text-center text-green-600 mb-6">Upcoming Events</h2>
        <div className="w-full">
          <CardContainer events={upcomingEvents} />
        </div>
      </div>

      {/* Past Events Section */}
      <div className="w-full mb-12">
        <h2 className="text-4xl font-semibold text-center text-blue-600 mb-6">Past Events</h2>
        <div className="w-full">
          <CardContainer events={pastEvents} />
        </div>
      </div>
    </div>
  );
};

export default ViewAllEvents;
