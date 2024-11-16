import React, { useState } from 'react'
import Navbar from './Navbar'
import Home from './Home'
import { Route, Router, Routes } from 'react-router-dom'
import AboutUs from './AboutUs'
import SideMenu from './SideMenu'
import SocietyPage from './SocietyPage'
import ViewAllEvents from './ViewAllEvents'

const UserView = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  return (
    <div>
        <Navbar isSideMenuOpen={isSideMenuOpen}  setIsSideMenuOpen={setIsSideMenuOpen}/>
        <SideMenu isSideMenuOpen={isSideMenuOpen} setIsSideMenuOpen={setIsSideMenuOpen}/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/societypage" element={<SocietyPage />} />
            <Route path="/viewallevents" element={<ViewAllEvents />} />
        </Routes>
        <AboutUs/>
    
    </div>
  )
}

export default UserView