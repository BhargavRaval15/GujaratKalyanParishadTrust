import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/events", label: "Events" },
    { path: "/news", label: "News" },
    { path: "/donate", label: "Donate" },
    { path: "/contact", label: "Contact" },
    // { path: "/admin/login", label: "Admin" }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass backdrop-blur-xl shadow-2xl py-2' 
          : 'gradient-orange py-4'
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 lg:px-8">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-3"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
            <img 
              src="/logo.jpg" 
              alt="Gujarat Kalyan Parishad Trust Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className={`font-bold transition-all duration-300 ${
              scrolled ? 'text-gray-800 text-lg lg:text-xl' : 'text-white text-xl lg:text-2xl'
            }`}>
              Gujarat Kalyan Parishad
            </h1>
            <p className={`text-xs transition-all duration-300 ${
              scrolled ? 'text-gray-600' : 'text-orange-100'
            }`}>
              Serving Society with Values
            </p>
          </div>
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1 bg-white/10 backdrop-blur-xl rounded-2xl p-1.5 border border-white/20 shadow-2xl">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="relative"
              >
                <Link
                  to={item.path}
                  className={`relative px-6 py-3.5 rounded-xl font-semibold transition-all duration-700 group overflow-hidden block ${
                    isActive
                      ? scrolled 
                        ? 'text-white shadow-2xl transform scale-105' 
                        : 'text-white shadow-2xl transform scale-110'
                      : scrolled
                        ? 'text-gray-700 hover:text-white hover:scale-110'
                        : 'text-white/90 hover:text-white hover:scale-110'
                  }`}
                >
                  {/* Active Tab Background with Enhanced Gradient */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBackground"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, #ff6b35, #f7931e, #ffaa44, #ff8c42)',
                        backgroundSize: '300% 300%'
                      }}
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                      }}
                      transition={{ 
                        type: "spring", 
                        bounce: 0.3, 
                        duration: 0.8,
                        backgroundPosition: {
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    />
                  )}
                  
                  {/* Enhanced Hover Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: isActive 
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                        : scrolled
                          ? 'linear-gradient(135deg, #ff6b35, #f7931e)'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
                    }}
                  />
                  
                  {/* Glow Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: '0 0 30px rgba(255, 107, 53, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                    }}
                  />
                  
                  {/* Content with Better Typography */}
                  <span className="relative flex items-center justify-center z-10">
                    <motion.span 
                      className="font-semibold text-sm tracking-wide uppercase"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  </span>
                  
                  {/* Enhanced Active Indicator */}
                  {isActive && (
                    <>
                      {/* Bottom indicator line */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 h-0.5 w-8 bg-white rounded-full shadow-lg"
                      />
                      
                      {/* Top indicator dot */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-lg"
                      />
                    </>
                  )}
                  
                  {/* Enhanced Shimmer Effect */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.4) 50%, transparent 75%)',
                      }}
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  
                  {/* Subtle Border Highlight */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className={`lg:hidden p-2 rounded-full transition-all duration-300 ${
            scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="glass-dark backdrop-blur-xl mx-4 my-4 rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-3">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        className={`relative flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 overflow-hidden group ${
                          isActive
                            ? 'text-white shadow-2xl transform scale-105'
                            : 'text-white hover:bg-white/10 hover:scale-105'
                        }`}
                        onClick={toggleMenu}
                      >
                        {/* Active Background */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 gradient-orange rounded-xl animate-pulse-glow"
                          />
                        )}
                        
                        {/* Hover Background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        
                        {/* Content */}
                        <span className="relative z-10 flex items-center justify-center">
                          <span className="font-semibold">{item.label}</span>
                        </span>
                        
                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full shadow-lg z-10"
                          />
                        )}
                        
                        {/* Shimmer Effect */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-xl"
                            style={{
                              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                            }}
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatDelay: 2,
                            }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
