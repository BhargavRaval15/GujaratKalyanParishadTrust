import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const services = [
    {
      icon: "🏥",
      title: "Healthcare Services",
      description: "Medical camps, health checkups, and wellness programs for communities",
      color: "gradient-blue"
    },
    {
      icon: "📚",
      title: "Education Initiatives",
      description: "Educational support, skill development, and career guidance programs",
      color: "gradient-green"
    },
    {
      icon: "🌱",
      title: "Environmental Care",
      description: "Tree plantation, environmental awareness, and sustainability projects",
      color: "gradient-purple"
    },
    {
      icon: "🤝",
      title: "Community Support",
      description: "Social welfare, disaster relief, and community development programs",
      color: "gradient-orange"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Lives Touched", icon: "❤️" },
    { number: "500+", label: "Events Organized", icon: "📅" },
    { number: "50+", label: "Villages Served", icon: "🏘️" },
    { number: "25+", label: "Years of Service", icon: "⭐" }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full gradient-orange opacity-10 animate-float"
          style={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 rounded-full gradient-blue opacity-10 animate-float"
          style={{
            x: mousePosition.x * -0.01,
            y: mousePosition.y * -0.01
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-40 h-40 rounded-full gradient-green opacity-10 animate-float"
          style={{
            x: mousePosition.x * 0.015,
            y: mousePosition.y * 0.015
          }}
        />
      </div>

      {/* Bharatmata Image - Floating Side Element */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 2 }}
        className="fixed right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:block"
      >
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="relative group cursor-pointer"
        >
          <div className="w-20 h-32 sm:w-24 sm:h-36 lg:w-32 lg:h-48 rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border-2 lg:border-4 border-orange-200/50 bg-white p-1 lg:p-2">
            <img
              src="/Bharatmata.jpg"
              alt="Bharatmata - Mother India"
              className="w-full h-full object-cover rounded-lg lg:rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent rounded-lg lg:rounded-xl" />
          </div>
          
          {/* Glow effect */}
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 15px rgba(255, 107, 53, 0.3)",
                "0 0 30px rgba(255, 107, 53, 0.5)",
                "0 0 15px rgba(255, 107, 53, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-xl lg:rounded-2xl pointer-events-none"
          />
          
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-2 lg:mr-4 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm px-2 lg:px-3 py-1 lg:py-2 rounded-md lg:rounded-lg shadow-lg border border-orange-200"
          >
            <p className="text-xs lg:text-sm font-semibold text-orange-600 whitespace-nowrap">
              🙏 Bharatmata
            </p>
            <p className="text-xs text-gray-600 whitespace-nowrap">
              Mother India
            </p>
          </motion.div>
          
          {/* Decorative elements */}
          <motion.div
            className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-6 h-6 lg:w-8 lg:h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <span className="text-white text-xs">🕉️</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Poster Image with Animation */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/Poster.jpg')`,
            filter: 'brightness(0.4)'
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/80 via-orange-800/70 to-orange-600/60" />
        
        {/* Floating Elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 text-6xl opacity-30 animate-float z-5"
        >
          🕉️
        </motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 right-10 text-4xl opacity-30 animate-float z-5"
        >
          🙏
        </motion.div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6 sm:mb-8"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto rounded-full overflow-hidden border-2 sm:border-3 lg:border-4 border-white/30 shadow-2xl animate-pulse-glow">
              <img 
                src="/logo.jpg" 
                alt="Gujarat Kalyan Parishad Trust Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight"
          >
            <span className="block">Gujarat Kalyan</span>
            <span className="block text-gradient-orange bg-white bg-clip-text">Parishad Trust</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mb-4 sm:mb-6"
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-200 font-semibold mb-1 sm:mb-2 tracking-wide">
              ॥ मा कश्चित दुःखभाग् भवेत् ॥
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-orange-200 italic">
              "May no one suffer from sorrow"
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-orange-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2"
          >
            Inspired by RSS values — serving society through culture, service, and unity.
            Building a stronger nation, one community at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <Link to="/about" className="w-full sm:w-auto btn-primary group text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
              <span className="flex items-center justify-center space-x-2">
                <span>Discover Our Mission</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </span>
            </Link>
            <Link to="/donate" className="w-full sm:w-auto btn-secondary text-white border-white hover:bg-white hover:text-orange-600 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
              <span className="flex items-center justify-center space-x-2">
                <span>💝</span>
                <span>Support Our Cause</span>
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-white text-2xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Poster Section */}
      <section className="py-8 sm:py-10 lg:py-12 bg-gradient-to-br from-orange-50 to-orange-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 lg:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-orange mb-4 sm:mb-6">
              Serving Society with Values
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Stay informed about our latest initiatives and community programs
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative group cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="/Poster.jpg"
                  alt="Gujarat Kalyan Parishad Trust - Important Announcement"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm sm:text-base lg:text-lg font-semibold">Click to view full size</p>
                </div>
              </motion.div>
              
              
            </div>
          </motion.div>

          {/* Call to action for the poster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-10 lg:mt-12"
          >
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6">
              📱 Share this information with your community
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button 
                onClick={() => window.open('/Poster.jpg', '_blank')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                🔍 View Full Size
              </button>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Gujarat Kalyan Parishad Trust',
                      text: 'Check out this important announcement from Gujarat Kalyan Parishad Trust',
                      url: window.location.origin + '/Poster.jpg'
                    });
                  }
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                📤 Share
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4"
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2, type: "spring", bounce: 0.5 }}
                  className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gradient-orange mb-1 sm:mb-2"
                >
                  {stat.number}
                </motion.div>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-orange-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-orange mb-4 sm:mb-6">
              Our Services
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Comprehensive programs designed to uplift communities and build a stronger society
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card-modern group cursor-pointer p-4 sm:p-6 lg:p-8"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl ${service.color} flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 mx-auto group-hover:animate-pulse-glow`}>
                  <span className="text-xl sm:text-2xl lg:text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-orange mb-4 sm:mb-6">
                Our Mission
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8">
                To unite people through cultural awareness, health services, and education 
                initiatives inspired by Rashtriya Swayamsevak Sangh (RSS). We believe in 
                building a self-reliant and culturally rich society.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Cultural preservation and promotion",
                  "Community health and wellness",
                  "Educational empowerment",
                  "Environmental sustainability"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full gradient-orange flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs sm:text-sm">✓</span>
                    </div>
                    <span className="text-sm sm:text-base text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/Event.jpg"
                  alt="Trust Activities - Community Events"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/50 to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                  <p className="text-sm sm:text-base lg:text-lg font-semibold mb-1">Community Events</p>
                  <p className="text-xs sm:text-sm text-orange-100">Bringing people together through cultural and social activities</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 lg:-top-4 lg:-right-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 gradient-orange rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-lg sm:text-xl lg:text-2xl">🕉️</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 gradient-orange relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 sm:top-10 left-5 sm:left-10 text-4xl sm:text-6xl lg:text-8xl animate-float">🙏</div>
          <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 text-3xl sm:text-5xl lg:text-6xl animate-float">❤️</div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
          >
            Join Us In Nation Building
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg lg:text-xl text-orange-100 mb-8 sm:mb-10 leading-relaxed"
          >
            Become a volunteer or support our mission through donations. 
            Together, we can create lasting positive change in our communities.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          >
            <Link to="/donate" className="w-full sm:w-auto btn-secondary text-white border-white hover:bg-white hover:text-orange-600 group text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
              <span className="flex items-center justify-center space-x-2">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  💝
                </motion.span>
                <span>Make a Donation</span>
              </span>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto btn-secondary text-white border-white hover:bg-white hover:text-orange-600 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
              <span className="flex items-center justify-center space-x-2">
                <span>📞</span>
                <span>Get Involved</span>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
