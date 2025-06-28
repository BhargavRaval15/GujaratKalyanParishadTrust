import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="px-4 py-4 sm:p-6 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-orange-600 text-center"
      >
        About Gujarat Kalyan Parishad
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
        <motion.img
          src="https://images.unsplash.com/photo-1588776814546-e3c3db9cb070?auto=format&fit=crop&w=900&q=60"
          alt="Trust Activities"
          className="rounded-lg shadow-md w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 md:mt-0"
        >
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
            Gujarat Kalyan Parishad Trust, inspired by Rashtriya Swayamsevak Sangh (RSS), is committed to social transformation through cultural values, education, and community health.
          </p>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
            We conduct workshops, health camps, educational drives, and spiritual gatherings to strengthen the moral and cultural fabric of society. The trust actively collaborates with local volunteers and organizations to uplift underserved communities.
          </p>
        </motion.div>
      </div>
    </div>
  );
}