import React from 'react';

// Function to generate a random color
const getRandomColor = () => {
  const colors = [
    "bg-blue-400", "bg-red-400", "bg-green-400", "bg-yellow-400", 
    "bg-purple-400", "bg-pink-400", "bg-indigo-400", "bg-teal-400"
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const CardContainer = () => {
  const events = [
    {
      id: 1,
      title: "PROCOM 2024",
      date: "21-12-2024",
    },
    {
      id: 2,
      title: "PROCOM 2024",
      date: "21-12-2024",
    },
    {
      id: 3,
      title: "PROCOM 2024",
      date: "21-12-2024",
    },
    {
      id: 4,
      title: "PROCOM 2024",
      date: "21-12-2024",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => {
          const randomColor = getRandomColor(); // Get a random color for each card

          return (
            <div
              key={event.id}
              className={`group relative border p-4 rounded-lg h-80 flex flex-col justify-center items-center ${randomColor} text-white overflow-hidden transition-all duration-300`}
            >
              {/* Title */}
              <h3 className="card-title text-black text-3xl font-bold group-hover:text-4xl transition-all duration-300">
                {event.title}
              </h3>
              {/* Date */}
              <p className="card-title text-black text-xl group-hover:text-2xl transition-all duration-300">
                {event.date}
              </p>

              {/* Background opacity change */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardContainer;
