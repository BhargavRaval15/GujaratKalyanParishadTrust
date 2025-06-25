import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`/api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Failed to load event:", err));
  }, [id]);

  if (!event) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
      src={`${process.env.REACT_APP_API_BASE_URL}${event.image}`} // ✅ FIXED HERE
      alt={event.title}
      className="w-full max-h-[500px] object-cover rounded shadow mb-6 transition duration-300 ease-in-out"
    />
      <h1 className="text-3xl font-bold text-orange-700 mb-2">{event.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{event.date}</p>
      <p className="text-gray-800 text-lg leading-relaxed">{event.description}</p>
    </div>
  );
}
