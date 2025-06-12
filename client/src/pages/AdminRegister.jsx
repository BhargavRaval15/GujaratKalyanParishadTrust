import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../api/admin";

export default function AdminRegister() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerAdmin(form);
      setMessage("Registration successful! You can now log in.");
      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (err) {
      setMessage("Username already exists or error occurred.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Register</h2>
      {message && <p className="mb-2 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
}
