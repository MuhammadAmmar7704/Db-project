import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
//import AddEventForm from "./AddEventForm";
//import UpdateEventForm from "./UpdateEventForm";
import EventContext from "../../Context/eventContext/createContext.js";
import { Link } from "react-router-dom";
import AdminContext from "../../Context/adminContext/createContext.js";

const AdminEventsPage = () => {
  const { events, fetchAllEvents, fetchEventsByUniversityId } =
    useContext(EventContext);
  const { removeEvent } = useContext(AdminContext);
  const [currEvents, setCurrEvents] = useState([]);

  const deleteEvent = async (id) => {
    await removeEvent(id);
    fetchAllEvents();
  };

  useEffect(() => {
    const setting = async () => {
      await fetchAllEvents();
      const id = localStorage.getItem("society_id");
      const uni_id = localStorage.getItem("university_id");
      if (id) {
        const temp = events.filter((event) => event.society_id == id);
        setCurrEvents(temp);
      } else if (uni_id) {
        const res = await fetchEventsByUniversityId(uni_id);
        // console.log('here', res);
        setCurrEvents(res);
      } else {
        setCurrEvents(events);
      }
    };
    setting();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl text-gray-600 font-bold text-center mb-4">
        ADMINISTER EVENTS
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-h-[75vh] overflow-y-auto">
        {currEvents.map((event) => {
          let date = new Date(event.event_date);

          return (
            <div
              key={event.event_id}
              className="bg-white shadow-md rounded-md p-4"
            >
              {" "}
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-lg font-bold text-gray-500">{`ID - ${event.event_id}`}</h2>
                <h2 className="text-lg font-bold text-gray-500">
                  {event.event_name}
                </h2>

                <p className="text-gray-600 mb-2">{date.toUTCString()}</p>
                <p className="text-gray-800">{event.description}</p>
              </div>
              <div className="flex justify-center items-center gap-3">
                <Link
                  to={`update/${event.event_id}`}
                  state={event}
                  className="mt-2 bg-yellow-500 bg-opacity-85 hover:bg-opacity-100 text-white px-4 py-2 rounded-md"
                >
                  UPDATE
                </Link>
                <button
                  onClick={() => deleteEvent(event.event_id)}
                  className="mt-2 bg-red-500 bg-opacity-85 hover:bg-opacity-100 text-white px-4 py-2 rounded-md ml-2"
                >
                  DELETE
                </button>
                <Link
                  to={`contests/${event.event_id}`}
                  state={event}
                  className="mt-2 bg-yellow-500 bg-opacity-85 hover:bg-opacity-100 text-white px-4 py-2 rounded-md ml-2"
                >
                  VIEW
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <Link
          to="addevent"
          className="hover:bg-[#005F73] bg-opacity-75 bg-[#007F9D] font-bold text-white px-6 py-2 rounded-md"
        >
          ADD EVENT
        </Link>
      </div>
    </div>
  );
};

export default AdminEventsPage;
