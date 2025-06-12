import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-orange-600 text-white px-4 py-3 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">Gujarat Kalyan Parishad</h1>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/events">Events</Link>
          <Link to="/news">News</Link>
          <Link to="/donate">Donate</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/admin/login" className="hover:underline">Admin</Link>

        </div>
      </div>
    </nav>
  );
}
