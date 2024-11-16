import React from 'react'
import CardContainer from './CardContainer'

const ViewAllEvents = () => {
  return (
    <div className='py-10'>

    {/* Upcoming Events Section */}
    <div className="w-full mb-12">
        <h2 className="text-4xl font-semibold text-center text-green-600 mb-6">Upcoming Events</h2>
        <div className="w-full"><CardContainer/></div>
    </div>

    {/* recent Events Section */}
    <div className="w-full mb-12">
        <h2 className="text-4xl font-semibold text-center text-blue-600 mb-6">Past Events</h2>
        <div className="w-full"><CardContainer/></div>
    </div>
    </div>
  )
}

export default ViewAllEvents