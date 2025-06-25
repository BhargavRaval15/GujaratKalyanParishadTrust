import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
  axios.get("/api/events")
    .then(res => {
      console.log("Events data:", res.data); // Add this
      setEvents(res.data);
    })
    .catch(err => console.error("Failed to fetch events", err));
}, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-orange-600 text-center">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link
            to={`/events/${event._id}`}
            key={event._id}
            className="bg-white shadow rounded p-4 hover:shadow-lg transition block"
          >
            <img
               src={`${process.env.REACT_APP_API_BASE_URL}${event.image}`}  // ✅ Always correct image path
              alt={event.title}
              className="h-48 w-full object-cover rounded"
              onError={(e) => (e.target.style.display = "none")} // optional fallback
            />
            <h3 className="text-xl font-semibold mt-3">{event.title}</h3>
            <p className="text-gray-500 text-sm">{event.date}</p>
            <p className="text-gray-700 mt-2">
              {event.description.length > 100
                ? event.description.slice(0, 100) + "..."
                : event.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Events;
