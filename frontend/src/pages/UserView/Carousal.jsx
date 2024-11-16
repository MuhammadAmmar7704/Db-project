import React, { useState } from "react";

const Carousel = () => {
  const slides = [
    "https://i.imgur.com/CzXTtJV.jpg",
    "https://i.imgur.com/OB0y6MR.jpg",
    "https://farm4.staticflickr.com/3075/3168662394_7d7103de7d_z_d.jpg",
    "https://farm9.staticflickr.com/8505/8441256181_4e98d8bff5_z_d.jpg",
  ];

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
