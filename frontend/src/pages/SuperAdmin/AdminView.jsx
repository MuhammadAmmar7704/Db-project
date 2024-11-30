import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminEventsPage from './AdminEventsPage.jsx'
import AdminHome from './AdminHome.jsx'
import AddEntityForm from './AddForm.jsx'
import AdminContext from '../../Context/adminContext/createContext.js'
import UpdateEntityForm from './UpdateForm.jsx'
import AdminUsersPage from './AdminUsersPage.jsx'
import AdminUniPage from './AdminUniPage.jsx'
import AdminSocietyPage from './AdminSocietyPage.jsx'

const AdminView = () => {
  const {addEvent, updateEvent, addUniversity
    , updateUniversity, addSociety,
    updateSociety
  } = useContext(AdminContext);

  const handleAddEntity = async (formData, entityType) => {
    try {
      if(entityType === "event"){
        addEvent(formData);
      }else if(entityType === "university"){
        addUniversity(formData)
      }else if(entityType === "society"){
        addSociety(formData);
      }
    } catch (error) {

    }
  };
  const  applyUpdateEvent = async (data, entityType) => {
    
    try{
      if(entityType === "event"){
        await updateEvent(data);
      }else if(entityType === "university"){
        await updateUniversity(data);
      }else if(entityType === "society"){
        await updateSociety(data);
      }
    }catch(error){
      
    }
  }

  return (
    <div>
      <Routes>
        {/* EVENTS  */}
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

      {/* USER */}
      <Route path='/removeuser' element={<AdminUsersPage/>}></Route>



      {/* UNIVERSITIES */}
      <Route path='/universities' element={<AdminUniPage/>}></Route>
      <Route path='/universities/adduniversity' 
      element={<AddEntityForm
        entityType="University"
        fields={[
          { name: "name", label: "University Name", placeholder: "Enter university name", required: true },
          { name: "phone", label: "phone",placeholder: "Enter phone number", required: true },
          { name: "address", label: "address", placeholder: "Enter address", required: true },
          { name: "admin_id", label: "admin_id", placeholder: "Enter admin_id", required: true },
        ]}
        onSubmit={(formData) => handleAddEntity(formData, "university")}
      />}></Route>

      <Route
        path="/universities/update/:id"
        element={
          <UpdateEntityForm
            entityType="University"
            fields={[
              { name: "name", label: "University Name", placeholder: "Enter university name", required: true },
              { name: "phone", label: "phone",placeholder: "Enter phone number", required: true },
              { name: "address", label: "address", placeholder: "Enter address", required: true },
              { name: "admin_id", label: "admin_id", placeholder: "Enter admin_id", required: true },
            ]}
            onSubmit={(data) => applyUpdateEvent(data, "university")}
          />
        }
      />

      {/* SOCIETIES */}
      <Route path='/societies' element={<AdminSocietyPage/>}></Route>
      <Route path='/societies/addsociety' 
      element={<AddEntityForm
        entityType="Society"
        fields={[
          { name: "name", label: "Society Name", placeholder: "Enter Society name", required: true },
          { name: "university_id", label: "university_id",placeholder: "Enter university_id", required: true },
          { name: "image", label: "image", placeholder: "Upload image", required: true },
          { name: "admin_id", label: "admin_id", placeholder: "Enter admin_id", required: true },
        ]}
        onSubmit={(formData) => handleAddEntity(formData, "society")}
      />}></Route>

        <Route
        path="/societies/update/:id"
        element={
          <UpdateEntityForm
          entityType="Society"
          fields={[
            { name: "name", label: "Society Name", placeholder: "Enter Society name", required: true },
            { name: "university_id", label: "university_id",placeholder: "Enter university_id", required: true },
            { name: "image", label: "image", placeholder: "Upload image", required: true },
            { name: "admin_id", label: "admin_id", placeholder: "Enter admin_id", required: true },
          ]}
            onSubmit={(data) => applyUpdateEvent(data, "society")}
          />
        }
      />
      
      </Routes>

    </div>
  )
}

export default AdminView