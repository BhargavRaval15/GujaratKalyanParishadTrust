import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { motion } from "framer-motion";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get("/api/events")
      .then(res => {
        console.log("Events data:", res.data);
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch events", err);
        setLoading(false);
      });
  }, []);

  // Filter events based on search term
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="px-4 py-4 sm:p-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-6 sm:mb-10"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600">Upcoming Events</h2>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Join us for these exciting community gatherings</p>
      </motion.div>

      {/* Search bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6 sm:mb-8 max-w-md mx-auto"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <div className="absolute right-3 top-2 sm:top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-40 sm:h-64">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-6 sm:py-10 text-gray-500 text-sm sm:text-base"
        >
          {searchTerm ? "No events match your search" : "No events scheduled at this time"}
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredEvents.map((event) => (
            <motion.div key={event._id} variants={itemVariants}>
              <Link
                to={`/events/${event._id}`}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 block h-full flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={event.image ? `${process.env.REACT_APP_API_BASE_URL}${event.image}` : 'https://via.placeholder.com/800x400?text=Event+Image+Not+Available'}
                    alt={event.title}
                    className="h-40 sm:h-48 md:h-52 w-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      console.error("Image failed to load:", `${process.env.REACT_APP_API_BASE_URL}${event.image}`);
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/800x400?text=Event+Image+Not+Available';
                    }}
                  />
                  <div className="absolute top-0 right-0 bg-orange-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 m-2 rounded-full text-xs font-medium">
                    {event.date}
                  </div>
                </div>
                <div className="p-3 sm:p-4 md:p-5 flex-grow flex flex-col">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base flex-grow">
                    {event.description.length > 100
                      ? event.description.slice(0, 100) + "..."
                      : event.description}
                  </p>
                  <div className="mt-3 sm:mt-4 text-orange-600 font-medium text-xs sm:text-sm flex items-center">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default Events;
