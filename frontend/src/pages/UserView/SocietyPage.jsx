import React from 'react';
import CardContainer from './CardContainer';

const SocietyPage = () => {
  // Example data
  const societyData = {
    society_id: 1,
    name: "Tech Society",
    university: "University A",
    admin: "John Doe",
    description:
      "The Tech Society is a hub for innovation and collaboration, bringing together students passionate about technology to work on cutting-edge projects and organize tech events.",
    imageUrl: "https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg",
  };

  return (
    <>
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        {societyData.name}
      </h1>
      <div className="flex flex-col items-center">
        {/* Image */}
        <img
          src={societyData.imageUrl}
          alt={societyData.name}
          className="w-full max-h-72 object-cover rounded-md mb-4 shadow-md"
        />
        {/* Description */}
        <p className="text-gray-700 text-center mb-6">
          {societyData.description}
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600 font-semibold">University:</span>
          <span className="text-gray-800">{societyData.university}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600 font-semibold">Admin:</span>
          <span className="text-gray-800">{societyData.admin}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-semibold">Society ID:</span>
          <span className="text-gray-800">{societyData.society_id}</span>
        </div>
      </div>
    </div>
    
    {/* Upcoming Events Section */}
    <div className="w-full mb-12">
        <h2 className="text-4xl font-semibold text-center text-green-600 mb-6">Upcoming Events</h2>
        <div className="w-full"><CardContainer/></div>
    </div>

    {/* recent Events Section */}
    <div className="w-full mb-12">
        <h2 className="text-4xl font-semibold text-center text-blue-600 mb-6">Recent Events</h2>
        <div className="w-full"><CardContainer/></div>
    </div>
    </>
  );
};

export default SocietyPage;
