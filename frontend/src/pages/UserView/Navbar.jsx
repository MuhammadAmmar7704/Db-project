import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../Context/userContext/createContext.js';

const Navbar = (props) => {

  const {setIsSideMenuOpen, isSideMenuOpen} = props;
  const {logOut, isAuthenticated} = useContext(UserContext);
  const navigate = useNavigate();
  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const logOuttheUser = () => {
    logOut();
    localStorage.removeItem('user_id');
    //navigate('/login');
  }
  
  useEffect(()=>{
    if(!isAuthenticated)
    navigate('/login');
  }, [isAuthenticated])

  return (
    <div className="wrapper">
      <div className="multi_color_border"></div>
      <div className="top_nav">
        <div className="left">
          <div className="logo">
            <p>
              <span>Socio</span>Verse
            </p>
          </div>
          <div className="search_bar">
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="right">
          <ul>
            <li>
              <button className='btn btn-outline bg-indigo-700 text-white' onClick={logOuttheUser}>LogOut</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottom_nav">
        <ul className="flex space-x-6">
          <li>
            <Link to="/userview">Home</Link>
          </li>

          {/* Browse Societies */}
          <li >
          <div >
            <button
              className="btn btn-primary"
              onClick={toggleSideMenu}
            >
              Browse Societies
            </button>
          </div>
          </li>

    {/* {browse societies end} */}
          
          
          <li>
            <Link to="viewallevents">Events</Link>
          </li>
          <li>
            <Link to="contactus">Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
