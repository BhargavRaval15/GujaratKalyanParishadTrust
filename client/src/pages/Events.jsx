import { motion } from "framer-motion";

const events = [
  { id: 1, title: "Yoga Wellness Camp", date: "15 June", desc: "A holistic wellness retreat with morning yoga, Ayurvedic talks, and community lunch.", image: "https://images.unsplash.com/photo-1584467735871-ec69f69e68f3?auto=format&fit=crop&w=900&q=60" },
  { id: 2, title: "Swachh Bharat Drive", date: "22 June", desc: "Join our neighborhood cleanup supported by local volunteers and NGOs.", image: "https://images.unsplash.com/photo-1604773241375-ec3f7a6dcb7a?auto=format&fit=crop&w=900&q=60" },
  { id: 3, title: "Blood Donation Camp", date: "30 June", desc: "Partnered with Red Cross India to collect blood from over 500 donors.", image: "https://images.unsplash.com/photo-1588776814509-0d48f71a6a4f?auto=format&fit=crop&w=900&q=60" },
  { id: 4, title: "Cultural Awareness Fest", date: "5 July", desc: "A showcase of Indian heritage including dance, food, and tradition stalls.", image: "https://images.unsplash.com/photo-1533670801837-df159b4c4df4?auto=format&fit=crop&w=900&q=60" },
  { id: 5, title: "Tree Plantation Drive", date: "10 July", desc: "Plant 1000 trees with us and make Gujarat greener for the next generation.", image: "https://images.unsplash.com/photo-1578926282875-b49a6d3ba4d0?auto=format&fit=crop&w=900&q=60" }
];

export default function Events() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-8 text-orange-600 text-center"
      >
        Upcoming Events
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map((event) => (
          <motion.div
            key={event.id}
            className="bg-white rounded shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-orange-700 mb-1">{event.title}</h3>
              <p className="text-gray-500 text-sm">{event.date}</p>
              <p className="text-gray-700 mt-2">{event.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
