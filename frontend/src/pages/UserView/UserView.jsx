import React from 'react'
import Navbar from './Navbar'
import Home from './Home'
import Login from '../Login/Login'
import { Route, Router, Routes } from 'react-router-dom'
import AboutUs from './AboutUs'

const UserView = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
        <AboutUs/>
    
    </div>
  )
}

export default UserView