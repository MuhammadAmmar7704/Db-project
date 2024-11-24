import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AdminContext from "../../Context/adminContext/createContext.js";
import EventContext from "../../Context/eventContext/createContext.js";

const AdminSocietyPage = () => {
  const { societies, fetchAllSocieties } = useContext(EventContext);
  const  { removeSociety } = useContext(AdminContext);

  // Function to delete a society
  const deleteSociety = async (id) => {
    await removeSociety(id);
    fetchAllSocieties();
  };

  useEffect(() => {
    fetchAllSocieties();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Admin Societies</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-h-96 overflow-y-auto">
        {societies.map((society) => (
          <div
            key={society.society_id}
            className="bg-white shadow-md rounded-md p-4"
          >
            <h2 className="text-lg font-bold">{society.name}</h2>
            <p className="text-gray-600 mb-2">ID: {society.society_id}</p>
            <p className="text-gray-800 mb-2">University ID: {society.university_id}</p>
            <p className="text-gray-800 mb-2">Admin ID: {society.admin_id}</p>
            {society.image_url && (
              <img
                src={society.image_url}
                alt={society.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
            )}
            <Link
              to={`update/${society.society_id}`} // Dynamic route
              state={society} // Pass society data as state
              className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-md"
            >
              Update
            </Link>
            <button
              onClick={() => deleteSociety(society.society_id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <Link
          to="addsociety"
          className="bg-green-500 text-white px-6 py-2 rounded-md"
        >
          Add Society
        </Link>
      </div>
    </div>
  );
};

export default AdminSocietyPage;
