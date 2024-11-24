import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-4">
          {/* Events Button */}
          <Link
            className="w-full py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all flex justify-center"
            to='events'
          >
            Manage Events
          </Link>

          {/* Remove User Button */}
          <Link
            className="w-full py-3 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition-all flex justify-center"
            to='removeuser'
          >
            Remove User
          </Link>

          {/* Universities Button */}
          <Link
            className="w-full py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition-all flex justify-center"
            to='universities'
          >
            Manage Universities
          </Link>

          {/* Societies Button */}
          <Link
            className="w-full py-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-all flex justify-center"
            to='societies'
          >
            Manage Societies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
