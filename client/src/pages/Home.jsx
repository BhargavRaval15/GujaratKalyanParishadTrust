import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <section className="bg-orange-100 py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-orange-700"
        >
          Gujarat Kalyan Parishad Trust
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-lg max-w-xl mx-auto"
        >
          Inspired by RSS values — serving society through culture, service, and unity.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Link to="/about" className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition">
            Learn More
          </Link>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-white max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-4"
        >
          Our Mission
        </motion.h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          To unite people through cultural awareness, health services, and education initiatives inspired by Rashtriya Swayamsevak Sangh (RSS).
        </p>
      </section>

      {/* Call to Action */}
      <section className="bg-orange-50 py-16 px-6 text-center">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-orange-700"
        >
          Join Us In Nation Building
        </motion.h3>
        <p className="text-gray-700 mt-2">
          Become a volunteer or support our mission through donations.
        </p>
        <div className="mt-4 space-x-4">
          <Link to="/donate" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Donate
          </Link>
          <Link to="/contact" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
