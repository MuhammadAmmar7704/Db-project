import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminEventsPage from './AdminEventsPage.jsx'
import AdminHome from './AdminHome.jsx'
import AddEntityForm from './AddForm.jsx'
import AdminContext from '../../Context/adminContext/createContext.js'
import UpdateEntityForm from './UpdateForm.jsx'

const AdminView = () => {
  const {addEvent, updateEvent} = useContext(AdminContext);

  const handleAddEntity = async (formData, entityType) => {
    try {
      if(entityType === "event"){
        addEvent(formData);
      }
    } catch (error) {
    }
  };
  const  applyUpdateEvent = async (data, entityType) => {
    //fetchAllEvents();
    if(entityType === "event"){
      await updateEvent(data);
    }
  }

  return (
    <div>
      <Routes>
      <Route path='/events' element={<AdminEventsPage/>}></Route>
      <Route path='/' element={<AdminHome/>}></Route>
      <Route path='/events/addevent' 
      element={<AddEntityForm
        entityType="Event"
        fields={[
          { name: "event_name", label: "Event Name", placeholder: "Enter event name", required: true },
          { name: "event_date", label: "Date", type: "date", required: true },
          { name: "society_id", label: "Society ID", placeholder: "Enter society ID", required: true },
          { name: "image", label: "image", placeholder: "Upload Image", required: true },
        ]}
        onSubmit={(formData) => handleAddEntity(formData, "event")}
      />}></Route>
      <Route
        path="/events/update/:id"
        element={
          <UpdateEntityForm
            entityType="Event"
            fields={[
              { name: "event_name", label: "Event Name", placeholder: "Enter event name", required: true },
              { name: "event_date", label: "Date", type: "date" },
              { name: "image", label: "image", placeholder: "Upload Image" },
            ]}
            onSubmit={(data) => applyUpdateEvent(data, "event")}
          />
        }
      />
      </Routes>
    </div>
  )
}

export default AdminView