import React, { useContext, useEffect, useState } from "react";
import EventContext from "../../Context/eventContext/createContext.js";

const Carousel = () => {

  const {events} = useContext(EventContext);

  const [slides, setSlides] = useState([]);
  useEffect(() => {
    const sortedEvents = [...events].sort((a, b) => {
      const dateA = new Date(a.event_date);
      const dateB = new Date(b.event_date);
      return dateA - dateB; // Ascending order
    });
  
    const filteredEvents = sortedEvents.slice(0, 4);
  
    const slideImages = filteredEvents.map(event => event.image_url);
  
    setSlides(slideImages);
  }, [events]);
  

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative overflow-hidden rounded-box bg-gray-100 py-4 max-h-[90vh]">
      {/* Carousel Container */}
      <div
        className={`flex transition-transform duration-700 ease-in-out`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full flex items-center justify-center"
          >
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="rounded-lg shadow-lg max-h-[90vh] w-[80%]"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <button
          onClick={handlePrevious}
          className="btn btn-circle bg-orange-500 hover:bg-orange-600 border-none text-white"
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className="btn btn-circle bg-orange-500 hover:bg-orange-600 border-none text-white"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;
