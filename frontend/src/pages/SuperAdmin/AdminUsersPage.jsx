import React, { useContext, useEffect } from 'react'
import AdminContext from '../../Context/adminContext/createContext';

const AdminUsersPage = () => {

  const {getAllUsers, users, removeUser} = useContext(AdminContext); 

  const deleteUser = async (id) => {
    await removeUser(id);
    getAllUsers();
  }
  useEffect(()=>{
    getAllUsers();
  },[])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Users</h1>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-h-96 overflow-y-auto">
        {users.map((user) => {
            
           return (
          <div
            key={user.user_id}
            className="bg-white shadow-md rounded-md p-4"
          >
            <h2 className="text-lg font-bold">{`id - ${user.user_id}`}</h2>
            <h2 className="text-lg font-bold">{user.username}</h2>
            <p className="text-gray-800">{user.email}</p>
            
            <button
              onClick={() => deleteUser(user.user_id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Delete
            </button>
          </div>
        )})}
      </div>

      
      
    </div>
  );
  
}

export default AdminUsersPage