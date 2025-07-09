import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import { motion } from "framer-motion";
import { postNews, getAdminNews, deleteNews } from "../api/news";

export default function AdminDashboard() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [eventImages, setEventImages] = useState([]);
  const [eventDate, setEventDate] = useState("");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventImagePreviews, setEventImagePreviews] = useState([]);
  const [eventLoading, setEventLoading] = useState(false);
  
  // News management states
  const [newsTitle, setNewsTitle] = useState("");
  const [newsImages, setNewsImages] = useState([]);
  const [newsSource, setNewsSource] = useState("");
  const [newsMessage, setNewsMessage] = useState("");
  const [newsList, setNewsList] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    // Fetch events for the dashboard
    fetchEvents();
    fetchNews();
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

  const fetchNews = async () => {
    try {
      const data = await getAdminNews();
      setNewsList(data);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEventImageChange = (e) => {
    const files = Array.from(e.target.files);
    setEventImages(files);
    
    // Create preview URLs for the selected images
    if (files.length > 0) {
      const previews = [];
      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews[index] = reader.result;
          if (previews.length === files.length) {
            setEventImagePreviews([...previews]);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setEventImagePreviews([]);
    }
  };

  const handleNewsImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewsImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEventLoading(true);

    if (eventImages.length === 0) {
      setMessage("At least one photo is required for the event.");
      setEventLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      
      // Use default values if not provided
      data.append("title", form.title || "Event Photos");
      data.append("description", form.description || "Event documentation");
      data.append("date", eventDate || new Date().toISOString().split('T')[0]);
      
      // Add all images
      eventImages.forEach((image) => {
        data.append("images", image);
      });

      await axios.post("/api/admin/add-event", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Event added successfully! ✅");
      setForm({ title: "", description: "" });
      setEventImages([]);
      setEventImagePreviews([]);
      setEventDate("");
      document.getElementById("eventImages").value = "";
      
      // Refresh events list
      fetchEvents();
      
      // Auto-hide message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error adding event ❌");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setEventLoading(false);
    }
  };

  const handleEventDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/admin/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage("Event deleted successfully! ✅");
        fetchEvents();
        setTimeout(() => setMessage(""), 3000);
      } catch (err) {
        console.error(err);
        setMessage("Failed to delete event ❌");
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    setNewsLoading(true);

    if (newsImages.length === 0) {
      setNewsMessage("At least one photo is required.");
      setNewsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newsTitle || "News Photos");
      formData.append("description", newsSource ? `Newspaper: ${newsSource}` : "News documentation");
      formData.append("source", newsSource || "Unknown Source");
      formData.append("category", "Newspaper");
      
      newsImages.forEach((image) => {
        formData.append("images", image);
      });

      await postNews(formData);
      setNewsMessage("News uploaded successfully! ✅");
      setNewsTitle("");
      setNewsImages([]);
      setNewsSource("");
      document.getElementById("newsImages").value = "";
      fetchNews();
      setTimeout(() => setNewsMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setNewsMessage("Failed to upload news ❌");
      setTimeout(() => setNewsMessage(""), 3000);
    } finally {
      setNewsLoading(false);
    }
  };

  const handleNewsDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this newspaper?")) {
      try {
        await deleteNews(id);
        setNewsMessage("Newspaper deleted successfully! ✅");
        fetchNews();
        setTimeout(() => setNewsMessage(""), 3000);
      } catch (err) {
        console.error(err);
        setNewsMessage("Failed to delete newspaper ❌");
        setTimeout(() => setNewsMessage(""), 3000);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
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

  const [sidebarOpen, setSidebarOpen] = useState(false); // Always start closed on mobile

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-orange-600 text-white p-2 sm:p-3 rounded-md shadow-lg hover:bg-orange-700 transition-colors"
        aria-label="Toggle sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      <div className="flex">
        {/* Sidebar for desktop */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block w-64 sm:w-72 lg:w-72 bg-orange-600 text-white p-4 sm:p-6 space-y-4 shadow-lg h-screen overflow-y-auto z-40"
        >
          <div className="text-center pt-8 md:pt-2">
            <h2 className="text-lg sm:text-xl font-bold">Admin Dashboard</h2>
            <p className="text-orange-200 text-xs sm:text-sm mt-1">Gujarat Kalyan Parishad</p>
          </div>
          
          <div className="space-y-2 mt-6 sm:mt-8">
            <button 
              onClick={() => {
                setActiveTab("events");
                closeSidebar();
              }} 
              className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-md flex items-center text-sm sm:text-base transition-colors ${activeTab === "events" ? "bg-orange-700" : "hover:bg-orange-700"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Manage Events
            </button>
            
            <button 
              onClick={() => {
                setActiveTab("news");
                closeSidebar();
              }} 
              className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-md flex items-center text-sm sm:text-base transition-colors ${activeTab === "news" ? "bg-orange-700" : "hover:bg-orange-700"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v10a2 2 0 002 2h5z" />
              </svg>
              Manage News
            </button>
          </div>
          
          <div className="pt-6 sm:pt-8 mt-auto">
            <button 
              onClick={() => {
                handleLogout();
                closeSidebar();
              }}
              className="w-full bg-orange-700 hover:bg-orange-800 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-md flex items-center justify-center text-sm sm:text-base transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </motion.div>

        {/* Sidebar for mobile (only when open) */}
        {sidebarOpen && (
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed md:hidden top-0 left-0 w-64 sm:w-72 bg-orange-600 text-white p-4 sm:p-6 space-y-4 shadow-lg h-screen overflow-y-auto z-50"
          >
            <div className="text-center pt-8 md:pt-2">
              <h2 className="text-lg sm:text-xl font-bold">Admin Dashboard</h2>
              <p className="text-orange-200 text-xs sm:text-sm mt-1">Gujarat Kalyan Parishad</p>
            </div>
            
            <div className="space-y-2 mt-6 sm:mt-8">
              <button 
                onClick={() => {
                  setActiveTab("events");
                  closeSidebar();
                }} 
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-md flex items-center text-sm sm:text-base transition-colors ${activeTab === "events" ? "bg-orange-700" : "hover:bg-orange-700"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Manage Events
              </button>
              
              <button 
                onClick={() => {
                  setActiveTab("news");
                  closeSidebar();
                }} 
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-md flex items-center text-sm sm:text-base transition-colors ${activeTab === "news" ? "bg-orange-700" : "hover:bg-orange-700"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v10a2 2 0 002 2h5z" />
                </svg>
                Manage News
              </button>
            </div>
            
            <div className="pt-6 sm:pt-8 mt-auto">
              <button 
                onClick={() => {
                  handleLogout();
                  closeSidebar();
                }}
                className="w-full bg-orange-700 hover:bg-orange-800 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-md flex items-center justify-center text-sm sm:text-base transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </motion.div>
        )}

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 pt-16 md:pt-6 lg:pt-8 min-h-screen overflow-x-hidden">
          {/* Dashboard Header */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3"
          >
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 break-words">
              {activeTab === "events" ? "Event Management" : "News Management"}
            </h1>
            <div className="flex space-x-2 w-full sm:w-auto">
              <Link to="/" className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 sm:py-2 px-2 sm:px-3 md:px-4 rounded-md flex items-center text-xs sm:text-sm transition-colors flex-1 sm:flex-none justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="hidden sm:inline">View Website</span>
                <span className="sm:hidden">Website</span>
              </Link>
            </div>
          </motion.div>

          {/* Dashboard Stats */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8"
          >
            <motion.div variants={itemVariants} className="bg-white p-3 sm:p-4 lg:p-5 rounded-lg shadow-sm border-l-4 border-orange-500">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-full bg-orange-100 text-orange-500 mr-3 sm:mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-500 text-xs sm:text-sm truncate">Total Events</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">{events.length}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-3 sm:p-4 lg:p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-full bg-blue-100 text-blue-500 mr-3 sm:mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v10a2 2 0 002 2h5z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-500 text-xs sm:text-sm truncate">Total News</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">{newsList.length}</p>
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
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
          >
            {/* Add Event Form */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-5 lg:p-6 order-2 lg:order-1">
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 break-words">
                📅 Add New Event
              </h2>

              {message && (
                <div className={`mb-4 p-2 sm:p-3 rounded-lg text-sm ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block font-semibold mb-2 text-xs sm:text-sm md:text-base">Event Photos *</label>
                  <input
                    type="file"
                    id="eventImages"
                    multiple
                    accept="image/*"
                    onChange={handleEventImageChange}
                    className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                    required
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                    📸 Upload multiple photos of the event (Required)
                  </p>
                  {eventImagePreviews.length > 0 && (
                    <div className="mt-2 sm:mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                      {eventImagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={preview} 
                            alt={`Preview ${index + 1}`} 
                            className="w-full h-16 sm:h-20 md:h-24 object-cover rounded-lg border"
                          />
                          <div className="absolute top-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {eventImages.length > 0 && (
                    <p className="text-xs sm:text-sm text-green-600 mt-1 sm:mt-2">
                      ✅ {eventImages.length} photo(s) selected
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-xs sm:text-sm md:text-base">Event Title (Optional)</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                    placeholder="e.g., Community Health Camp, Cultural Program... (Optional)"
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    💡 If not provided, will default to "Event Photos"
                  </p>
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-xs sm:text-sm md:text-base">Event Date (Optional)</label>
                  <div className="grid grid-cols-3 gap-1 sm:gap-2">
                    {/* Day */}
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-600 mb-1">Day</label>
                      <select
                        value={eventDate.split('-')[2] || ''}
                        onChange={(e) => {
                          const [year, month] = eventDate.split('-');
                          setEventDate(`${year || new Date().getFullYear()}-${month || '01'}-${e.target.value.padStart(2, '0')}`);
                        }}
                        className="w-full border border-gray-300 p-1.5 sm:p-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs sm:text-sm"
                      >
                        <option value="">Day</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                          <option key={day} value={day.toString().padStart(2, '0')}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Month */}
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-600 mb-1">Month</label>
                      <select
                        value={eventDate.split('-')[1] || ''}
                        onChange={(e) => {
                          const [year, , day] = eventDate.split('-');
                          setEventDate(`${year || new Date().getFullYear()}-${e.target.value}-${day || '01'}`);
                        }}
                        className="w-full border border-gray-300 p-1.5 sm:p-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs sm:text-sm"
                      >
                        <option value="">Month</option>
                        <option value="01">Jan</option>
                        <option value="02">Feb</option>
                        <option value="03">Mar</option>
                        <option value="04">Apr</option>
                        <option value="05">May</option>
                        <option value="06">Jun</option>
                        <option value="07">Jul</option>
                        <option value="08">Aug</option>
                        <option value="09">Sep</option>
                        <option value="10">Oct</option>
                        <option value="11">Nov</option>
                        <option value="12">Dec</option>
                      </select>
                    </div>

                    {/* Year */}
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-600 mb-1">Year</label>
                      <select
                        value={eventDate.split('-')[0] || ''}
                        onChange={(e) => {
                          const [, month, day] = eventDate.split('-');
                          setEventDate(`${e.target.value}-${month || '01'}-${day || '01'}`);
                        }}
                        className="w-full border border-gray-300 p-1.5 sm:p-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs sm:text-sm"
                      >
                        <option value="">Year</option>
                        {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() + 10 - i).map(year => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    📅 Optional - If not selected, today's date will be used
                  </p>
                  {eventDate && (
                    <p className="text-xs sm:text-sm text-green-600 mt-1 break-words">
                      ✅ Selected: {new Date(eventDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-xs sm:text-sm md:text-base">Event Description (Optional)</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-24 sm:h-32 text-xs sm:text-sm md:text-base resize-none"
                    placeholder="Describe the event details, venue, time, etc... (Optional)"
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    💡 If not provided, will default to "Event documentation"
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={eventLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base"
                >
                  {eventLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                      Adding Event...
                    </>
                  ) : (
                    <>
                      📅 Add Event
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Events List */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-5 lg:p-6 order-1 lg:order-2">
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 break-words">
                📋 Upcoming Events
              </h2>
              
              <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-orange-500"></div>
                  </div>
                ) : events.length === 0 ? (
                  <div className="text-center py-6 sm:py-8 text-gray-500">
                    <div className="text-2xl sm:text-4xl mb-2">📅</div>
                    <p className="text-xs sm:text-sm">No events scheduled yet.</p>
                  </div>
                ) : (
                  events.map((event) => (
                    <div key={event._id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 break-words">{event.title}</h3>
                          <div className="text-xs sm:text-sm text-gray-600 mt-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-700 line-clamp-2 break-words">{event.description}</p>
                          </div>
                          
                          {event.images && event.images.length > 0 && (
                            <div className="mt-2 sm:mt-3">
                              <img
                                src={`http://localhost:5000${event.images[0]}`}
                                alt="Event"
                                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded border"
                              />
                              {event.images.length > 1 && (
                                <span className="text-xs text-gray-500 ml-2">
                                  +{event.images.length - 1} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                          <Link 
                            to={`/events/${event._id}`} 
                            target="_blank"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm flex items-center justify-center gap-1 flex-1 sm:flex-none transition-colors"
                          >
                            👁️ <span className="hidden sm:inline">View</span>
                          </Link>
                          <button
                            onClick={() => handleEventDelete(event._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm flex items-center justify-center gap-1 flex-1 sm:flex-none transition-colors"
                          >
                            🗑️ <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === "news" && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
          >
            {/* Upload Form */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-5 lg:p-6 order-2 lg:order-1">
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 break-words">
                📰 Upload News Photos
              </h2>

              {newsMessage && (
                <div className={`mb-4 p-2 sm:p-3 rounded-lg text-sm ${newsMessage.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {newsMessage}
                </div>
              )}

              <form onSubmit={handleNewsSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block font-semibold mb-2 text-xs sm:text-sm md:text-base">News Title (Optional)</label>
                  <input
                    type="text"
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                    placeholder="e.g., Today's Headlines, Sports News... (Optional)"
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    💡 If not provided, will default to "News Photos"
                  </p>
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-xs sm:text-sm md:text-base">Newspaper Name (Optional)</label>
                  <input
                    type="text"
                    value={newsSource}
                    onChange={(e) => setNewsSource(e.target.value)}
                    className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                    placeholder="e.g., Gujarat Samachar, Divya Bhaskar... (Optional)"
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    💡 If not provided, will default to "Unknown Source"
                  </p>
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-xs sm:text-sm md:text-base">News Photos *</label>
                  <input
                    type="file"
                    id="newsImages"
                    multiple
                    accept="image/*"
                    onChange={handleNewsImageChange}
                    className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                    required
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    📸 Upload multiple photos of news/newspaper pages (Required)
                  </p>
                  {newsImages.length > 0 && (
                    <p className="text-xs sm:text-sm text-green-600 mt-1">
                      ✅ {newsImages.length} photo(s) selected
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={newsLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base"
                >
                  {newsLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      📤 Upload News Photos
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* News List */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-5 lg:p-6 order-1 lg:order-2">
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 break-words">
                📋 Uploaded News
              </h2>
              
              <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
                {newsList.length === 0 ? (
                  <div className="text-center py-6 sm:py-8 text-gray-500">
                    <div className="text-2xl sm:text-4xl mb-2">📰</div>
                    <p className="text-xs sm:text-sm">No news uploaded yet.</p>
                  </div>
                ) : (
                  newsList.map((news) => (
                    <div key={news._id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 break-words">{news.title}</h3>
                          <div className="text-xs sm:text-sm text-gray-600 mt-1 space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                              <span className="break-words">📰 {news.source}</span>
                              <span>📅 {new Date(news.date).toLocaleDateString()}</span>
                            </div>
                            {news.images && (
                              <div className="flex items-center gap-2">
                                <span>📸 {news.images.length} photo(s)</span>
                              </div>
                            )}
                          </div>
                          
                          {news.images && news.images.length > 0 && (
                            <div className="flex gap-2 mt-2 sm:mt-3 overflow-x-auto pb-2">
                              {news.images.slice(0, 3).map((image, index) => (
                                <img
                                  key={index}
                                  src={`http://localhost:5000${image}`}
                                  alt={`Preview ${index + 1}`}
                                  className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded border flex-shrink-0"
                                />
                              ))}
                              {news.images.length > 3 && (
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded border flex items-center justify-center text-xs text-gray-600 flex-shrink-0">
                                  +{news.images.length - 3}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleNewsDelete(news._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm flex items-center justify-center gap-1 w-full sm:w-auto transition-colors"
                        >
                          🗑️ <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
        </div>
      </div>
    </div>
  );
}