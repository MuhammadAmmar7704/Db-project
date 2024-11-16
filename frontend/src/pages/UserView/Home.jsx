import React from 'react';
import Carousel from './Carousal';
import CardContainer from './CardContainer';

const Home = () => {
  return (
    <div className="px-6 py-8">
      {/* Main Title */}
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8">
        Welcome to SocioVerse
      </h1>
      
      {/* Upcoming Events Section */}
      <div className="w-full mb-12">
        <h2 className="text-4xl font-semibold text-center text-indigo-600 mb-6">UpComing Events</h2>
        <div className="w-full"><Carousel/></div>
      </div>

      {/* Recent Events Section */}
      <div className="w-full mb-12">
        <h2 className="text-4xl font-semibold text-center text-green-600 mb-6">Recent Events</h2>
        <div className="w-full"><CardContainer/></div>
      </div>

      {/* Societies Section */}
      <div className="w-full mb-12">
        <h2 className="text-4xl font-semibold text-center text-blue-600 mb-6">Societies</h2>
        <div className="w-full"><CardContainer/></div>
      </div>
    </div>
  );
};

export default Home;
