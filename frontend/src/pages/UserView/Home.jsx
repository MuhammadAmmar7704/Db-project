import React, { useContext, useEffect, useState } from "react";
import Carousel from "./Carousal";
import CardContainer from "./CardContainer";
import EventContext from "../../Context/eventContext/createContext.js";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const Home = (props) => {
  const { events, societies } = useContext(EventContext);
  const [firstThreeEvents, setFirstThreeEvents] = useState([]);
  const [firstThreeSocieties, setFirstThreeSocieties] = useState([]);
  const { setIsSideMenuOpen } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user_id")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    let temp = [];
    if (events[0]) temp.push(events[0]);
    if (events[1]) temp.push(events[1]);
    if (events[2]) temp.push(events[2]);
    setFirstThreeEvents(temp);
  }, [events]);

  useEffect(() => {
    let temp = [];
    if (societies[0]) temp.push(societies[0]);
    if (societies[1]) temp.push(societies[1]);
    if (societies[2]) temp.push(societies[2]);
    setFirstThreeSocieties(temp);
  }, [societies]);

  return (
    <Box
      className="px-6 py-8"
      sx={{
        // background:'url(https://www.transparenttextures.com/patterns/wood-pattern.png)',
        background: "#E8E8E8",
        minHeight: "100vh",
      }}
    >
      {/* Main Title */}
      <h1 className="text-5xl font-extrabold text-center text-gray-700 mb-8">
        Welcome to <span>Socio</span>
        <span>Verse</span>
      </h1>

      {/* Upcoming Events Section */}
      <div className="w-full mb-12">
        <h2 className="text-4xl font-semibold text-center text-gray-500 mb-6">
          Recent Events
        </h2>
        <div className="w-full">
          <Carousel />
        </div>
      </div>

      {/* Recent Events Section */}
      <div className="w-full mb-12 flex flex-col items-center">
        <h2 className="text-4xl font-semibold text-center text-gray-600 mb-6">
          Upcoming Events
        </h2>
        <div className="w-full">
          <CardContainer events={firstThreeEvents} />
        </div>
        <Link to="viewallevents">
          <h3
            className="text-2xl  font-semibold hover:bg-[#005F73] bg-[#007F9D] text-center px-3 my-4 text-white mb-6 py-5 max-w-40
                 rounded-2xl shadow-lg bg-opacity-75 hover:shadow-xl transition-all duration-300 cursor-pointer "
          >
            View More
          </h3>
        </Link>
      </div>

      {/* Societies Section */}
      <div className="w-full mb-12 flex flex-col items-center">
        <h2 className="text-4xl font-semibold text-center text-gray-600 mb-6">
          Societies
        </h2>
        <div className="w-full">
          <CardContainer societies={firstThreeSocieties} />
        </div>

        <h3
          className="text-2xl font-semibold text-center px-1 my-4 text-white mb-6 py-5 max-w-40 
                 rounded-2xl hover:bg-[#005F73] bg-opacity-75 bg-[#007F9D] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer "
          onClick={() => setIsSideMenuOpen(true)}
        >
          Browse More
        </h3>
      </div>
    </Box>
  );
};

export default Home;
