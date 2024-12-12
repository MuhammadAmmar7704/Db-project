import React from "react";
import { Link } from "react-router-dom";

const ChoicePage = () => {
  return (
    <div className="flex flex-col items-center text-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        <span className="">Welcome!</span>
        <br />
        <span>Choose Preference</span>
      </h1>
      <div className="flex space-x-4">
        {/* Button to navigate to Admin View */}
        <Link
          to="/adminview"
          className="px-6 py-3 hover:bg-[#005F73] bg-opacity-75 bg-[#007F9D] text-white rounded-md text-lg hover:bg-blue-700 transition-all"
        >
          ADMIN VIEW
        </Link>

        {/* Button to navigate to User View */}
        <Link
          to="/userview"
          className="px-6 py-3 hover:bg-[#005F73] bg-opacity-75 bg-[#007F9D] text-white rounded-md text-lg hover:bg-green-700 transition-all"
        >
          USER VIEW
        </Link>
      </div>
    </div>
  );
};

export default ChoicePage;
