import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const cardData = [
  {
    title: "સમાજ જાગરણ માટેના સેવા કાર્યો",
    icon: "🎯",
    color: "gradient-orange",
    points: [
      "સામાજિક તથા રાષ્ટ્રીય વિષયો નેલઈને જાહેર વક્તાઓ દ્વારા જાહેર ઉદબોધનના કાર્યો",
      "વ્યસન મુક્તિ અભિયાન",
      "સુવિચાર લેખન બોર્ડ"
    ]
  },
  {
    title: "સ્વાવલંબન ક્ષેત્ર ના સેવાકાર્ય",
    icon: "💪",
    color: "gradient-blue",
    points: [
      "મહિલાઓ માટે સિલાઈ પ્રશિક્ષણ કેન્દ્ર",
      "મહેંદી પ્રશિક્ષણ કેન્દ્ર",
      "યુવાનો માટે ઈલેક્ટ્રીક વાયરીંગ કોર્સ"
    ]
  },
  {
    title: "મેડિકલ ક્ષેત્રમા સેવાકીય કામ",
    icon: "🏥",
    color: "gradient-green",
    points: [
      "મેડિકલ સાધન સહાય કેન્દ્ર",
      "સાપ્તાહિક મેડિકલ કેન્દ્ર નિદાન અને ઉપચાર",
      "અંતરિયાળ ગામોમાં આયુર્વેદિક પેટી",
      "અંતરિયાળ ગામોમાં આયુર્વેદિક કેમ્પ નિદાન તથા સારવાર",
      "રક્તગઢ પરીક્ષણ કેમ્પ",
      "રક્તદાન શિબિર",
      "યોગ કેન્દ્ર",
      "પોષણ માટે પોષણ સહાય પાવડર વિતરણ",
      "ગ્રામ્ય વિસ્તારમાંથી શહેરમાં ઉપચાર માટે આવેલ દર્દીઓ માટે ભોજન વ્યવસ્થા",
      "સુવર્ણ પ્રાશન કેન્દ્ર"
    ]
  },
  {
    title: "પર્યાવરણ ક્ષેત્રે સેવાકીય કાર્યો",
    icon: "🌱",
    color: "gradient-purple",
    points: [
      "પર્યાવરણ બચાવવા માટે જાગૃતિ અભિયાન",
      "વૃક્ષારોપણ કાર્યક્રમ",
      "પ્લાસ્ટિક નો ઉપયોગ ઘટે તેના માટે જાગરણ ઈકો બ્રિક્સ બનાવવા માટે માર્ગદર્શન"
    ]
  },
  {
    title: "સમાજના અતિ ગરીબ લોકો માટેના સેવા કાર્યો",
    icon: "🤝",
    color: "gradient-orange",
    points: [
      "સહાય અને ખૂબ જરૂરીયાતમંદ લોકોને નિયમિત રાસણ કીટ વિતરણ",
      "મુઠ્ઠી ધન યોજના",
      "વંચિત વસ્તીમાં જઈને ધાર્મિક ઉત્સવો કરવાના",
      "દિવાળીમાં મીઠાઈ તથા ફટાકડા વિતરણ",
      "જરૂરિયાત મંદ લોકોને ધાબળા વિતરણ"
    ]
  },
  {
    title: "ખેડૂતો માટેના સેવા કાર્યો",
    icon: "🚜",
    color: "gradient-green",
    points: [
      "ઝીરો બજેટ ખેતી માટે અલગ અલગ ગામોમાં ટ્રેનિંગ કેમ્પ",
      "ઓર્ગેનિક ખેતી માટે જાગૃતતા લાવવી",
      "ખેતી માટે માર્ગદર્શન શિબિર"
    ]
  },
  {
    title: "શ્રમિકો માટેના સેવા કાર્યો",
    icon: "👷",
    color: "gradient-blue",
    points: [
      "ઇશ્રમ કાર્ડ કાઢવા માટેના કેમ્પ",
      "આયુષ્યમાન કાર્ડ કાઢવા માટેના કેમ્પ"
    ]
  },
  {
    title: "કુદરતી આફતો વખતેના સેવા કાર્યો",
    icon: "🆘",
    color: "gradient-purple",
    points: [
      "રોગચાળો ફાટી નીકળે ત્યારે સેવા કરી જરૂરિયા�� મુજબના તમામ",
      "કુદરતી આફતોમાં સેવા કેન્દ્ર",
      "રેસ્ક્યુમાં તંત્રને મદદ કરવા માટેની ટીમ",
      "જરૂરત પડે ત્યારે ફૂડ પેકેટ તથા ભોજન ની વ્યવસ્થા ઉભી કરવી",
      "આપત સમયે જરૂરિયાતવાળા વિસ્તાર માટે રાશન કીટનું વિતરણ",
      "વાવાઝોડું ભૂકંપ જેવી આપત્તિ સમયે ઘરવખરીનો સામાન્ય કીટ વિતરણ"
    ]
  },
  {
    title: "શિક્ષણ ક્ષેત્રમાં સેવાકીય કામ",
    icon: "📚",
    color: "gradient-orange",
    points: [
      "અતિ પછાત વસ્તીમાં શિક્ષણ કેન્દ્ર",
      "સીસીસી કોમ્પ્યુટર ક્લાસ નિમ્નદરે",
      "નળકાંઠા વિસ્તારમાં દરેક સ્કૂલમાં જઈને ચલ પ્રયોગશાળા",
      "ફુલસ્કેપ ચોપડા વિતરણ",
      "કારકિર્દી મ��ર્ગદર્શન શિબિર",
      "સરકારી પરીક્ષા ની તૈયારી નું પુસ્તકાલય",
      "પછાત વિદ્યાર્થીઓ માટે છાત્રાલય"
    ]
  }
];

export default function About() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const [expandedCard, setExpandedCard] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const values = [
    {
      icon: "🕉️",
      title: "Spiritual Values",
      description: "Rooted in ancient wisdom and cultural heritage"
    },
    {
      icon: "🤝",
      title: "Community Service",
      description: "Dedicated to serving society with compassion"
    },
    {
      icon: "🌟",
      title: "Excellence",
      description: "Striving for the highest standards in all endeavors"
    },
    {
      icon: "🌍",
      title: "Unity",
      description: "Building bridges across communities and cultures"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 right-10 w-32 h-32 rounded-full gradient-orange opacity-5 animate-float"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-40 left-10 w-24 h-24 rounded-full gradient-blue opacity-5 animate-float"
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 gradient-orange overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 sm:top-10 left-5 sm:left-10 text-4xl sm:text-6xl lg:text-8xl animate-float">🕉️</div>
          <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 text-3xl sm:text-5xl lg:text-6xl animate-float">🙏</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto rounded-full gradient-orange bg-white flex items-center justify-center mb-6 sm:mb-8 animate-pulse-glow"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl">🕉️</span>
            </motion.div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4">
              About Gujarat Kalyan Parishad
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-4 sm:mb-6"
            >
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-yellow-200 font-semibold mb-1 sm:mb-2 tracking-wide">
                ॥ मा कश्चित दुःखभाग् भवेत् ॥
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-orange-200 italic">
                "May no one suffer from sorrow"
              </p>
            </motion.div>
            
            <p className="text-base sm:text-lg lg:text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed px-4">
              Inspired by RSS values, dedicated to serving society through culture, service, and unity
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/vaibhavamar.jpeg"
                    alt="Vaibhavamar - Trust Activities and Cultural Heritage"
                    className="w-full h-auto min-h-64 sm:min-h-80 lg:min-h-96 object-contain bg-gradient-to-br from-orange-50 to-white"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600/30 to-transparent" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                      <p className="text-sm sm:text-base lg:text-lg font-semibold mb-1">Vaibhavamar</p>
                      <p className="text-xs sm:text-sm text-orange-100">Cultural Heritage and Trust Activities</p>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 lg:-top-4 lg:-right-4 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 gradient-orange rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-lg sm:text-xl lg:text-2xl">🕉️</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8 order-1 lg:order-2"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-orange mb-4 sm:mb-6">Our Mission</h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  Gujarat Kalyan Parishad Trust, inspired by Rashtriya Swayamsevak Sangh (RSS), 
                  is committed to social transformation through cultural values, education, and 
                  community health. We conduct workshops, health camps, educational drives, and 
                  spiritual gatherings to strengthen the moral and cultural fabric of society.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Our Vision</h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                  To build a self-reliant, culturally rich, and spiritually awakened society 
                  that upholds the values of service, unity, and national pride.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gradient-orange mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our every action and decision
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card-modern text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl mb-6 group-hover:animate-pulse-glow"
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gradient-orange mb-6">
              Our Service Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive programs designed to uplift communities across various sectors
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="card-modern group cursor-pointer"
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
              >
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl ${card.color} flex items-center justify-center mr-4 group-hover:animate-pulse-glow`}>
                    <span className="text-2xl">{card.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 flex-1">
                    {card.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedCard === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-orange-600"
                  >
                    ↓
                  </motion.div>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedCard === index ? "auto" : "120px",
                    opacity: expandedCard === index ? 1 : 0.7
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-3">
                    {card.points.slice(0, expandedCard === index ? card.points.length : 3).map((point, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start space-x-3 text-gray-600"
                      >
                        <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {card.points.length > 3 && expandedCard !== index && (
                    <div className="mt-3 text-orange-600 text-sm font-medium">
                      +{card.points.length - 3} more services...
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-orange relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl animate-float">🙏</div>
          <div className="absolute bottom-10 right-10 text-6xl animate-float">❤️</div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Join Our Mission
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-orange-100 mb-10 leading-relaxed"
          >
            Be part of our journey to create positive change in society. 
            Together, we can build a stronger, more united community.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a href="/contact" className="btn-secondary text-white border-white hover:bg-white hover:text-orange-600">
              <span className="flex items-center space-x-2">
                <span>📞</span>
                <span>Get Involved</span>
              </span>
            </a>
            <a href="/donate" className="btn-secondary text-white border-white hover:bg-white hover:text-orange-600">
              <span className="flex items-center space-x-2">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  💝
                </motion.span>
                <span>Support Us</span>
              </span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
