import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardContainer from './CardContainer';
import EventContext from '../../Context/eventContext/createContext';

const SocietyPage = () => {
  const { societies } = useContext(EventContext);
  const { id } = useParams(); 
  const [society, setSociety] = useState(null);

  useEffect(() => {
    
    if (societies) {
      
      const foundSociety = societies.find(
        (society) => society.society_id === parseInt(id) // Ensure `id` is a number
      );
      setSociety(foundSociety);
    }
  }, [societies, id]); // Re-run the effect if societies or id change

  if (!society) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl text-gray-600">Loading society details...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
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
            <span className="text-gray-600 font-semibold">University:</span>
            <span className="text-gray-800">{society.university_id}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-semibold">Admin:</span>
            <span className="text-gray-800">{society.admin_id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">Society ID:</span>
            <span className="text-gray-800">{society.society_id}</span>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default SocietyPage;
