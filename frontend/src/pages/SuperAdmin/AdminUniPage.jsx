import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AdminContext from "../../Context/adminContext/createContext.js";
import UCRContext from "../../Context/uniContestRegistrationContext/createContext.js";

const AdminUniPage = () => {
  const { universities, fetchAllUniversities} = useContext(UCRContext);
  const { removeUniversity } = useContext(AdminContext);

  // Function to delete a university
  const deleteUniversity = async (id) => {
    await removeUniversity(id);
    fetchAllUniversities();
  };

  useEffect(() => {
    fetchAllUniversities();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Admin Universities</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-h-96 overflow-y-auto">
        {universities.map((university) => (
          <div
            key={university.university_id}
            className="bg-white shadow-md rounded-md p-4"
          >
            <h2 className="text-lg font-bold">{university.name}</h2>
            <p className="text-gray-600 mb-2">ID: {university.university_id}</p>
            <p className="text-gray-800 mb-2">Phone: {university.phone}</p>
            <p className="text-gray-800 mb-2">Address: {university.address}</p>
            <p className="text-gray-800">Admin ID: {university.admin_id}</p>
            <Link
              to={`update/${university.university_id}`} // Dynamic route
              state={university} // Pass university data as state
              className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-md"
            >
              Update
            </Link>
            <button
              onClick={() => deleteUniversity(university.university_id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <Link
          to="adduniversity"
          className="bg-green-500 text-white px-6 py-2 rounded-md"
        >
          Add University
        </Link>
      </div>
    </div>
  );
};

export default AdminUniPage;
