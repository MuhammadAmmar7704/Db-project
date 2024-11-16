import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

const SideMenu = (props) => {
  const {isSideMenuOpen, setIsSideMenuOpen} = props;
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [filteredSocieties, setfilteredSocieties] = useState(null);
  
  const universities = ["University A", "University B", "University C", "University D"];


  const societies = [
    {
        universiy : "University A",
        society   : "Society A "
    },{
        universiy : "University B",
        society   : "Society A "
    },{
        universiy : "University A",
        society   : "Society B "
    },{
        universiy : "University C",
        society   : "Society C "
    },{
        universiy : "University D",
        society   : "Society D "
    },{
        universiy : "University A",
        society   : "Society C "
    },{
        universiy : "University D",
        society   : "Society A "
    },{
        universiy : "University D",
        society   : "Society C "
    }
  ];

  useEffect(() =>{
    setIsSideMenuOpen(false);
    setShowSubMenu(false);
    setfilteredSocieties(societies);
  }, [])

  const showSocieties = (uni) => {
    const filtered = societies.filter((society) => society.universiy === uni); 
    setfilteredSocieties(filtered); 
    setShowSubMenu(!showSubMenu); 
  };
  

  return (
    <div>
        <div
        className={`max-h-screen min-w-96 max-w-[25%] fixed -left-96 bg-white shadow-lg h-5/6 overflow-visible
          transition-transform duration-300 ease-in-out z-50
         ${!isSideMenuOpen ? "transform translate-x-0" : "transform translate-x-full"}`}
        
         style={{border:"2px solid red"}}
      >
        <div className="p-4">
          
          <p className="text-md text-black p-4 pb-2 text-lg font-semibold text-center">
            UNIVERSITIES
          </p>

           <div>
           {universities.map((university, index) => (
                <p
                    className="text-stone-600 text-center py-4 hover:bg-black hover:text-orange-500 z-50"
                    onClick={() => showSocieties(university)} // Pass the university name
                    key={index}
                >
                    {university}
                </p>
            ))}

           </div>
           
           {showSubMenu && (
        
                <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute w-full top-16 left-96 bg-white"
                >
                {filteredSocieties &&
                    filteredSocieties.map((society, index) => (
                    <p
                    className="text-stone-600 text-center py-4 hover:bg-black hover:text-orange-500"
                    key={index}
                    >
                    {society.society}
                    </p>
                ))}
                </motion.div>
            )}

        </div>
      </div>
    </div>
  )
}

export default SideMenu