import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AdminDashboard() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
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
      setMessage("Event added ✅");
      setForm({ title: "", description: "" });
      setImage(null);
      setDate(new Date());
    } catch (err) {
      setMessage("Error adding event ❌");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Post New Event</h2>
      {message && <p className="mb-2 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          className="w-full p-2 border rounded"
          dateFormat="dd MMMM yyyy"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded h-24"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Submit
        </button>
      </form>
    </div>
  );
}
