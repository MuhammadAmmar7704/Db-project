import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import UCRContext from '../../Context/uniContestRegistrationContext/createContext';
import EventContext from '../../Context/eventContext/createContext';
import { Link } from 'react-router-dom';

const SideMenu = (props) => {
  const { isSideMenuOpen, setIsSideMenuOpen } = props;
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [filteredSocieties, setfilteredSocieties] = useState(null);
  
  
  const { universities } = useContext(UCRContext);
  const { societies } = useContext(EventContext);

  useEffect(() => {
    setIsSideMenuOpen(false);
    setShowSubMenu(false);
    setfilteredSocieties(societies); 
  }, []);

  useEffect(() => {
    
    if(!isSideMenuOpen){
      setShowSubMenu(false);
      setfilteredSocieties(null); 
    }
  }, [isSideMenuOpen]);

  const showSocieties = (uni_id) => {
    const filtered = societies.filter((society) => society.university_id === uni_id);
    setfilteredSocieties(filtered);
    setShowSubMenu(true);
  };

  const handleMouseEnter = (universityId) => {
    showSocieties(universityId);
  };

  const handleMouseLeave = () => {
    
  };

  return (
    <div>
      <div
        className={`max-h-screen min-w-96 max-w-[25%] fixed -left-96 bg-white shadow-lg h-5/6 overflow-visible
          transition-transform duration-300 ease-in-out z-50
         ${!isSideMenuOpen ? "transform translate-x-0" : "transform translate-x-full"}`}
        style={{ border: "2px solid red" }}
      >
        <div className="p-4">
          <p className="text-md text-black p-4 pb-2 text-lg font-semibold text-center">
            UNIVERSITIES
          </p>

          <div>
            {/* Map over universities array */}
            {universities.map((university, index) => (
              <p
                className="text-stone-600 text-center py-4 hover:bg-black hover:text-orange-500 z-50"
                onMouseEnter={() => handleMouseEnter(university.university_id)}
                onMouseLeave={handleMouseLeave}
                key={index}
              >
                {university.name}
              </p>
            ))}
          </div>

          {showSubMenu && (
            <motion.div
              key="submenu" 
              layout 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{
                duration: 0.3, 
                ease: "easeInOut", 
              }}
              className="absolute w-full top-16 left-96 bg-white border shadow-lg p-4 z-50 rounded-md"
            >
              {filteredSocieties &&
                filteredSocieties.map((society, index) => (
                  <Link to={`viewsociety/${society.society_id}`} key={index}>
                  <p
                    className="text-stone-600 text-center py-4 hover:bg-black hover:text-orange-500"
                    
                    >
                    {society.name}
                  </p>
                  </Link>
                ))}
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SideMenu;
