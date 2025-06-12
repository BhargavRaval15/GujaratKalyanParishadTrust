import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Import Link
import { loginAdmin } from "../api/admin";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginAdmin(form);
      localStorage.setItem("adminToken", token);
      navigate("/admin/dashboard");
    } catch {
      setError("Login failed. Please check credentials.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
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
        <button className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700">
          Login
        </button>
      </form>

      {/* ✅ Register Link */}
      <p className="text-sm mt-4 text-center">
        New admin?{" "}
        <Link to="/admin/register" className="text-orange-600 underline">
          Register here
        </Link>
      </p>
    </div>
  );
}
