import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Box} from '@mui/material';
import EventContext from '../../Context/eventContext/createContext.js';
import CardContainer from './CardContainer.jsx';

const SocietyPage = () => {
  const { fetchSociety, events } = useContext(EventContext);
  const { id } = useParams(); 
  const [society, setSociety] = useState(null);
  const [societyEvents, setSocietyEvents] = useState(events);


  useEffect(() => {
    
    const loadSocietyData = async () => {
      const societyData = await fetchSociety(id); 
      setSociety(societyData[0]);
    };
    loadSocietyData();
    const filterEventsBySociety = (events, societyId) => {
      if (!events || !Array.isArray(events)) {
        console.error('Invalid events data.');
        return [];
      }

    
      return events.filter(event => event.society_id == societyId);
    };

    const temp = filterEventsBySociety(events, id);

    setSocietyEvents(temp);


  }, [id,events]);

  if (!society) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl text-gray-600">Loading society details...</h2>
      </div>
    );
  }

  return (
    <Box sx={{
      background:'url(https://www.transparenttextures.com/patterns/wood-pattern.png)',
        minHeight: '100vh',
        
        padding: 20,
        
    }}>

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md"  >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          {society.name}
        </h1>
        <div className="flex flex-col items-center">
          {/* Image */}
          <img
            src={society.image_url}
            alt={society.name}
            className="w-full max-h-72 object-cover rounded-md mb-4 shadow-md"
          />
          {/* Description */}
          <p className="text-gray-700 text-center mb-6">{society.description}</p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-semibold">University_id:</span>
            <span className="text-gray-800">{society.university_id}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-semibold">University name:</span>
            <span className="text-gray-800">{society.university_name}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-semibold">Admin id:</span>
            <span className="text-gray-800">{society.admin_id}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-semibold">Admin username:</span>
            <span className="text-gray-800">{society.admin_name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">Society ID:</span>
            <span className="text-gray-800">{society.society_id}</span>
          </div>
        </div>
      </div>
      <h2 className="text-4xl font-semibold text-center text-green-600 my-6">Events By Machine</h2>
      <div className="w-full"><CardContainer events={societyEvents}/></div>
      
    </Box>
  );
};

export default SocietyPage;
