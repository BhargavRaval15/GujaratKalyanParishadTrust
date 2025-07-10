import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/events/${id}`)
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load event:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-40 sm:h-64 mt-6 sm:mt-10">
      <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );
  
  if (!event) return (
    <div className="text-center mt-6 sm:mt-10 p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-3 sm:mb-4">Event Not Found</h2>
      <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">The event you're looking for doesn't exist or has been removed.</p>
      <Link to="/events" className="bg-orange-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded hover:bg-orange-700 transition">
        Back to Events
      </Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 sm:mb-6"
      >
        <Link to="/events" className="inline-flex items-center text-orange-600 hover:text-orange-700 transition text-sm sm:text-base">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Events
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {/* Main Image Display */}
        <div className="relative">
          <img
            src={event.images && event.images.length > 0 ? `${process.env.REACT_APP_API_BASE_URL}${event.images[0]}` : 'https://via.placeholder.com/800x400?text=Event+Image+Not+Available'}
            alt={event.title}
            className="main-event-image w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover transition duration-300 ease-in-out"
            onError={(e) => {
              console.error("Image failed to load:", event.images && event.images.length > 0 ? `${process.env.REACT_APP_API_BASE_URL}${event.images[0]}` : 'No image available');
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/800x400?text=Event+Image+Not+Available';
            }}
          />
          <div className="absolute top-0 right-0 bg-orange-600 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 m-2 sm:m-3 md:m-4 rounded-full text-xs sm:text-sm md:text-base font-medium">
            {event.date}
          </div>
        </div>

        {/* Additional Images Gallery */}
        {event.images && event.images.length > 1 && (
          <div className="p-4 sm:p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Event Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {event.images.slice(1).map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}${image}`}
                    alt={`Gallery image ${index + 2}`}
                    className="w-full h-20 sm:h-24 md:h-28 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onError={(e) => {
                      console.error("Gallery image failed to load:", `${process.env.REACT_APP_API_BASE_URL}${image}`);
                      e.target.style.display = 'none';
                    }}
                    onClick={(e) => {
                      // Replace main image with clicked gallery image
                      const mainImg = document.querySelector('.main-event-image');
                      if (mainImg) {
                        mainImg.src = e.target.src;
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 sm:p-6 md:p-8">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4"
          >
            {event.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="border-l-4 border-orange-500 pl-3 sm:pl-4 my-4 sm:my-6">
              <p className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-700">Share this event:</h3>
                <div className="flex space-x-3 sm:space-x-4 mt-1 sm:mt-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="text-blue-400 hover:text-blue-600">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                  <button className="text-green-600 hover:text-green-800">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <Link 
                to="/contact" 
                className="bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-orange-700 transition flex items-center"
              >
                Contact Us
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
