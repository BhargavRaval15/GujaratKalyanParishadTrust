import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Message sent! ✅");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6 text-orange-600 text-center"
      >
        Get in Touch
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src="https://images.unsplash.com/photo-1600880292089-90e6a0d8d460?auto=format&fit=crop&w=900&q=60"
            alt="Contact"
            className="rounded-lg shadow"
          />
          <p className="mt-4 text-gray-600">
            Office Address:<br />123 Seva Marg, Ahmedabad, Gujarat - 380001<br />Phone: +91 98765 43210
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded shadow"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded shadow"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 border rounded shadow h-32"
          ></textarea>
          <button
            type="submit"
            className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
          >
            Send Message
          </button>
          {status && <p className="text-green-600 mt-2">{status}</p>}
        </form>
      </div>
    </div>
  );
}