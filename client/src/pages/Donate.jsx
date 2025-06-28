import { motion } from "framer-motion";

export default function Donate() {
  return (
    <div className="px-4 py-4 sm:p-6 max-w-3xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-orange-600"
      >
        Contribute to the Cause
      </motion.h2>
      <p className="mb-4 sm:mb-6 text-gray-700 text-sm sm:text-base md:text-lg px-2">
        Your donation helps us organize educational drives, cultural training, and health services. Contribute through UPI, bank transfer, or in person.
      </p>
      <motion.img
        src="https://upload.wikimedia.org/wikipedia/commons/8/8e/UPI-QR-code-demo.png"
        alt="Donate QR Code"
        className="mx-auto h-40 sm:h-48 md:h-56 rounded-lg shadow-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      />
      <p className="text-gray-600 mt-3 sm:mt-4 text-xs sm:text-sm">
        Account: Gujarat Kalyan Parishad Trust<br />Bank: State Bank of India<br />IFSC: SBIN0000001<br />Email us at <span className="font-semibold">donate@gujaratkalyan.org</span>
      </p>
    </div>
  );
}
