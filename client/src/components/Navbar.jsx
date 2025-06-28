import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-orange-600 text-white px-4 py-3 shadow-md relative z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold">Gujarat Kalyan Parishad</h1>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-orange-200 transition">Home</Link>
          <Link to="/about" className="hover:text-orange-200 transition">About</Link>
          <Link to="/events" className="hover:text-orange-200 transition">Events</Link>
          <Link to="/news" className="hover:text-orange-200 transition">News</Link>
          <Link to="/donate" className="hover:text-orange-200 transition">Donate</Link>
          <Link to="/contact" className="hover:text-orange-200 transition">Contact</Link>
          <Link to="/admin/login" className="hover:text-orange-200 transition">Admin</Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-orange-600 shadow-md py-2 px-4 flex flex-col space-y-2 animate-fadeIn">
          <Link to="/" className="py-2 hover:bg-orange-700 px-2 rounded" onClick={toggleMenu}>Home</Link>
          <Link to="/about" className="py-2 hover:bg-orange-700 px-2 rounded" onClick={toggleMenu}>About</Link>
          <Link to="/events" className="py-2 hover:bg-orange-700 px-2 rounded" onClick={toggleMenu}>Events</Link>
          <Link to="/news" className="py-2 hover:bg-orange-700 px-2 rounded" onClick={toggleMenu}>News</Link>
          <Link to="/donate" className="py-2 hover:bg-orange-700 px-2 rounded" onClick={toggleMenu}>Donate</Link>
          <Link to="/contact" className="py-2 hover:bg-orange-700 px-2 rounded" onClick={toggleMenu}>Contact</Link>
          <Link to="/admin/login" className="py-2 hover:bg-orange-700 px-2 rounded" onClick={toggleMenu}>Admin</Link>
        </div>
      )}
    </nav>
  );
}
