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
    <div className="px-4 py-4 sm:p-6 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-orange-600 text-center"
      >
        Get in Touch
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src="https://images.unsplash.com/photo-1600880292089-90e6a0d8d460?auto=format&fit=crop&w=900&q=60"
            alt="Contact"
            className="rounded-lg shadow w-full"
          />
          <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">
            Office Address:<br />Surendranagar, Gujarat - 363002<br />Phone: +91 XXXXX XXXXX
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mt-6 md:mt-0">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded shadow text-sm sm:text-base"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded shadow text-sm sm:text-base"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded shadow h-24 sm:h-32 text-sm sm:text-base"
          ></textarea>
          <button
            type="submit"
            className="bg-orange-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded text-sm sm:text-base hover:bg-orange-700"
          >
            Send Message
          </button>
          {status && <p className="text-green-600 mt-2 text-sm sm:text-base">{status}</p>}
        </form>
      </div>
    </div>
  );
}