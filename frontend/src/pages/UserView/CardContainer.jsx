import React from 'react';
import { Link } from 'react-router-dom';

// Function to generate a random color
const getRandomColor = () => {
  const colors = [
    "bg-blue-400", "bg-red-400", "bg-green-400", "bg-yellow-400", 
    "bg-purple-400", "bg-pink-400", "bg-indigo-400", "bg-teal-400"
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const CardContainer = (props) => {
  const { events, societies } = props;

  //console.log(societies);

  return (
    <div>
      <div >
        {/* events */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events && events.map((event) => {
          const randomColor = getRandomColor(); // Get a random color for each card

          return (
            <Link key={event.event_id} to={`/userview/viewevent/${event.event_id}`}>
            <div
              
              className={`group relative border p-4 rounded-lg h-80 flex flex-col justify-center items-center text-white overflow-hidden transition-all duration-300 ${randomColor}`}
              >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center filter blur-lg group-hover:blur-none transition-all duration-300"
                style={{ backgroundImage: `url(${event.image_url})` }}
              ></div>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Title */}
                <h3 className="card-title text-black text-3xl font-bold group-hover:text-4xl transition-all duration-300">
                  {event.event_name}
                </h3>
                {/* Date */}
                <p className="card-title text-black text-xl group-hover:text-2xl transition-all duration-300">
                  {new Date(event.event_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Background Overlay */}
              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-all duration-300"></div>
            </div>
          </Link>
          );
        })}
        </div>

        {/* societies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {societies && societies.map((society) => {
          const randomColor = getRandomColor(); // Get a random color for each card

          return (
            <Link key={society.society_id} to={`/userview/viewsociety/${society.society_id}`}>
            <div
              
              className={`group relative border p-4 rounded-lg h-80 flex flex-col justify-center items-center text-white overflow-hidden transition-all duration-300 ${randomColor}`}
              >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center filter blur-lg group-hover:blur-none transition-all duration-300"
                style={{ backgroundImage: `url(${society.image_url})` }}
              ></div>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Title */}
                <h3 className="card-title text-black text-3xl font-bold group-hover:text-4xl transition-all duration-300">
                  {society.name}
                </h3>
                
              </div>
              
              {/* Background Overlay */}
              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-all duration-300"></div>
            </div>
          </Link>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
