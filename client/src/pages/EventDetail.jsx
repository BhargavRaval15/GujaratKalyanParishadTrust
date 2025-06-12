import { useEffect, useState } from "react";
import axios from "../api/axios"; // your base Axios

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("/api/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error("Failed to fetch events", err));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-orange-600 text-center">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {events.map((event) => (
  <div key={event._id} className="bg-white shadow rounded p-4">
    <img
      src={`http://localhost:5000${event.image}`}  // ✅ FIXED HERE
      alt={event.title}
      className="h-48 w-full object-cover rounded"
    />
    <h3 className="text-xl font-semibold mt-3">{event.title}</h3>
    <p className="text-gray-500 text-sm">{event.date}</p>
    <p className="text-gray-700 mt-2">{event.description}</p>
  </div>
))}

      </div>
    </div>
  );
}
