import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Events", path: "/events" },
        { name: "News", path: "/news" }
      ]
    },
    {
      title: "Get Involved",
      links: [
        { name: "Donate", path: "/donate" },
        { name: "Contact Us", path: "/contact" },
        { name: "Volunteer", path: "/contact" },
        // { name: "Admin Login", path: "/admin/login" }
      ]
    }
  ];

  
  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="gradient-orange">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 sm:top-10 left-5 sm:left-10 text-3xl sm:text-5xl lg:text-6xl animate-float">🕉️</div>
          <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 text-2xl sm:text-3xl lg:text-4xl animate-float">🙏</div>
          <div className="absolute top-1/2 left-1/4 text-xl sm:text-2xl lg:text-3xl animate-float">❤️</div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-3 sm:pb-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-0">
            {/* Organization Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                {/* <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center animate-pulse-glow">
                  <span className="text-lg sm:text-xl">🕉️</span>
                </div> */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Gujarat Kalyan Parishad</h3>
                  <p className="text-orange-100 text-xs">Serving Society with Values</p>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center space-x-2 sm:space-x-3 text-orange-100">
                  <span className="text-base sm:text-lg">📍</span>
                  <span className="text-xs sm:text-sm">Gujarat, India</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-orange-100">
                  <span className="text-base sm:text-lg">📞</span>
                  <span className="text-xs sm:text-sm">+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-orange-100">
                  <span className="text-base sm:text-lg">✉️</span>
                  <span className="text-xs sm:text-sm break-all">gujratkp1975@gmail.com</span>
                </div>
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="col-span-1"
              >
                <h4 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">{section.title}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-1 sm:gap-y-2">
                  {section.links.map((link, linkIndex) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: linkIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        to={link.path}
                        className="text-orange-100 hover:text-white transition-colors duration-300 text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 group"
                      >
                        <motion.span
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs sm:text-sm"
                        >
                          →
                        </motion.span>
                        <span>{link.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orange-400/30 pt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 sm:pb-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0"
          >
            <p className="text-orange-100 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Gujarat Kalyan Parishad Trust. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-3 sm:space-x-6 text-xs sm:text-sm">
              <button className="text-orange-100 hover:text-white transition-colors duration-300">
                Privacy Policy
              </button>
              <button className="text-orange-100 hover:text-white transition-colors duration-300">
                Terms of Service
              </button>
              <button className="text-orange-100 hover:text-white transition-colors duration-300">
                Sitemap
              </button>
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </footer>
  );
}
