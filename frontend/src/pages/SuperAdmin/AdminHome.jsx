import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../Context/userContext/createContext";

const AdminHome = () => {
  const [role, setRole] = useState("");
  const { logOut, isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  useEffect(() => {
    setRole(localStorage.getItem("role_name"));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          ADMIN DASHBOARD
        </h1>

        <div className="grid grid-cols-1 gap-4">
          {/* Events Button */}
          {
            <Link
              className="w-full py-3 hover:bg-[#005F73] bg-opacity-75 bg-[#007F9D] text-white rounded-md text-lg shadow-md transition-all flex justify-center"
              to="events"
            >
              MANAGE EVENTS
            </Link>
          }

          {/* Remove User Button */}
          {role === "Super_Admin" && (
            <Link
              className="w-full py-3 hover:bg-[#005F73] bg-opacity-75 bg-[#007F9D] text-white text-lg rounded-md shadow-md  transition-all flex justify-center"
              to="removeuser"
            >
              REMOVE USER
            </Link>
          )}

          {/* Universities Button */}
          {role === "Super_Admin" && (
            <Link
              className="w-full py-3 hover:bg-[#005F73] bg-opacity-75 bg-[#007F9D] text-white text-lg rounded-md shadow-md  transition-all flex justify-center"
              to="universities"
            >
              MANAGE UNIVERSITIES
            </Link>
          )}

          {/* Societies Button */}
          {(role === "Super_Admin" || role === "University_Head") && (
            <Link
              className="w-full py-3 hover:bg-[#005F73] bg-opacity-75 bg-[#007F9D] text-white text-lg rounded-md shadow-md  transition-all flex justify-center"
              to="societies"
            >
              MANAGE SOCIETIES
            </Link>
          )}

          {/* LOG OUT */}
          <button
            className="w-full py-3 hover:bg-[#005F73] bg-opacity-75 bg-[#007F9D] text-white text-lg rounded-md shadow-md  transition-all flex justify-center"
            onClick={logOut}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
