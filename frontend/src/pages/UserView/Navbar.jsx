import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {

  const {setIsSideMenuOpen, isSideMenuOpen} = props;

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

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
              <a href="#">LogIn</a>
            </li>
            <li>
              <a href="#">SignUp</a>
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
