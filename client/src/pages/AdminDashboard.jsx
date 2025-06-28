import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // In the useEffect function, modify the authentication check
  
  useEffect(() => {
  // Check if user is authenticated
  const token = localStorage.getItem("adminToken");
  if (!token) {
    navigate("/admin/login");
    return;
  }

  // Fetch events for the dashboard
  fetchEvents();
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/events");
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    // Create preview URL for the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("date", date.toDateString());
    if (image) data.append("image", image);

    try {
      await axios.post("/api/admin/add-event", data, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Event added successfully! ✅");
      setForm({ title: "", description: "" });
      setImage(null);
      setImagePreview(null);
      setDate(new Date());
      
      // Refresh events list
      fetchEvents();
      
      // Auto-hide message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error adding event ❌");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 relative">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-orange-600 text-white p-2 rounded-md shadow-md"
        aria-label="Toggle sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-40 w-64 md:w-56 bg-orange-600 text-white p-4 space-y-4 shadow-sm h-full transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        <div className="text-center pt-2 md:pt-0">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <p className="text-orange-200 text-sm mt-1">Gujarat Kalyan Parishad</p>
        </div>
        
        <div className="space-y-2 mt-4">
          <button 
            onClick={() => {
              setActiveTab("events");
              if (window.innerWidth < 768) setSidebarOpen(false);
            }} 
            className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeTab === "events" ? "bg-orange-700" : "hover:bg-orange-700"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Manage Events
          </button>
          
          <button 
            onClick={() => {
              setActiveTab("news");
              if (window.innerWidth < 768) setSidebarOpen(false);
            }} 
            className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeTab === "news" ? "bg-orange-700" : "hover:bg-orange-700"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v10a2 2 0 002 2h5z" />
            </svg>
            Manage News
          </button>
        </div>
        
        <div className="pt-4 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full bg-orange-700 hover:bg-orange-800 text-white py-2 px-3 rounded-md flex items-center justify-center text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
        {/* Dashboard Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3"
        >
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            {activeTab === "events" ? "Event Management" : "News Management"}
          </h1>
          <div className="flex space-x-2">
            <Link to="/" className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-md flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              View Website
            </Link>
          </div>
        </motion.div>

        {/* Dashboard Stats */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8"
        >
          <motion.div variants={itemVariants} className="bg-white p-4 md:p-5 rounded-lg shadow-sm border-l-4 border-orange-500">
            <div className="flex items-center">
              <div className="p-2 md:p-3 rounded-full bg-orange-100 text-orange-500 mr-3 md:mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm">Total Events</p>
                <p className="text-xl md:text-2xl font-bold text-gray-800">{events.length}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-white p-4 md:p-5 rounded-lg shadow-sm border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-2 md:p-3 rounded-full bg-green-100 text-green-500 mr-3 md:mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm">Upcoming Events</p>
                <p className="text-xl md:text-2xl font-bold text-gray-800">
                  {events.filter(event => new Date(event.date) >= new Date()).length}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Content based on active tab */}
        {activeTab === "events" && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-md shadow-sm p-4 md:p-5"
          >
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-800 border-b pb-2">Add New Event</h2>
            
            {message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-3 md:mb-4 p-2 rounded-md text-xs md:text-sm ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {message}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-gray-700 text-xs md:text-sm font-medium mb-1">Event Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-transparent transition text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-xs md:text-sm font-medium mb-1">Event Date</label>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-transparent transition text-sm"
                  dateFormat="dd MMMM yyyy"
                  minDate={new Date()}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-xs md:text-sm font-medium mb-1">Event Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter event description"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-transparent transition h-20 md:h-24 text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-xs md:text-sm font-medium mb-1">Event Image</label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
                  <label className="w-full sm:flex-1 cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-md border border-gray-300 transition flex items-center justify-center text-xs md:text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {image ? "Change Image" : "Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  
                  {imagePreview && (
                    <div className="h-14 w-14 md:h-16 md:w-16 relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-full w-full object-cover rounded-md border border-gray-300" 
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-3 rounded-md font-medium transition flex items-center justify-center text-xs md:text-sm mt-2"
                type="submit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Event
              </motion.button>
            </form>
            
            {/* Recent Events List */}
            <div className="mt-6 md:mt-8">
              <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-gray-800 border-b pb-2">Recent Events</h3>
              
              {loading ? (
                <div className="flex justify-center items-center h-20 md:h-24">
                  <div className="animate-spin rounded-full h-5 w-5 md:h-6 md:w-6 border-t-2 border-b-2 border-orange-500"></div>
                </div>
              ) : events.length === 0 ? (
                <p className="text-gray-500 text-center py-4 md:py-6 text-xs md:text-sm">No events found. Add your first event above.</p>
              ) : (
                <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                  <table className="min-w-full bg-white text-xs md:text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-700 text-left">
                        <th className="py-2 px-2 md:px-3 font-medium">Title</th>
                        <th className="py-2 px-2 md:px-3 font-medium">Date</th>
                        <th className="py-2 px-2 md:px-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.slice(0, 5).map((event) => (
                        <tr key={event._id} className="border-t hover:bg-gray-50">
                          <td className="py-2 px-2 md:px-3 truncate max-w-[150px] md:max-w-none">{event.title}</td>
                          <td className="py-2 px-2 md:px-3">{event.date}</td>
                          <td className="py-2 px-2 md:px-3">
                            <div className="flex space-x-2">
                              <Link 
                                to={`/events/${event._id}`} 
                                target="_blank"
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {events.length > 5 && (
                    <div className="text-center mt-3">
                      <button className="text-orange-600 hover:text-orange-800 text-xs md:text-sm font-medium">
                        View All Events
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        {activeTab === "news" && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-md shadow-sm p-4 md:p-5"
          >
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-800 border-b pb-2">Manage News</h2>
            <p className="text-gray-600 text-xs md:text-sm">Switch to the News tab to manage news content.</p>
            <Link 
              to="/admin/news" 
              className="inline-block mt-2 md:mt-3 bg-orange-600 hover:bg-orange-700 text-white py-1.5 px-3 rounded-md transition text-xs md:text-sm"
            >
              Go to News Management
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
