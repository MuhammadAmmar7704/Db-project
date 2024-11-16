import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const universities = ["University A", "University B", "University C", "University D"];
  const dropdownHeight = universities.length * 40 + "px"; // Dynamic height calculation

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
            <li>
              <a href="#">ABOUT US</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottom_nav">
        <ul className="flex space-x-6">
          <li>
            <Link to="/">Home</Link>
          </li>

          {/* Browse Societies */}
          <li className="w-72">
          <div className="relative inline-block text-left">
      <button
        className="btn btn-primary"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        Dropdown Menu
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10"
        >
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            Action
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            Another Action
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            Something Else
          </a>
        </div>
      )}
    </div>


    {/* {browse societies end} */}
          </li>
          <li>
            <a href="#">Map</a>
          </li>
          <li>
            <a href="#">Articles</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
