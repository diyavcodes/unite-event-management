import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const role = localStorage.getItem("role");

  const isAdmin = role === "admin";

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (

    <nav className="sticky top-0 z-50 bg-black text-white shadow-md">

      <div className="flex items-center justify-between px-6 py-4">

        {/* LEFT */}
        <div className="flex items-center gap-6">

  {/* LOGO */}
  <Link
    to="/"
    className="flex items-center"
  >
    <img
      src={logo}
      alt="Logo"
      className="h-24 w-24 object-contain"
    />
  </Link>

  

</div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-5">

          {/* EVENTS BUTTON */}
  <button
    className=" font-semibold hover:text-blue-400 transition"
    onClick={(e) => {

      e.preventDefault();

      setMenuOpen(false);

      if (window.location.pathname !== "/") {

        navigate("/");

        setTimeout(() => {

          document
            .getElementById("events-section")
            ?.scrollIntoView({
              behavior: "smooth"
            });

        }, 100);

      } else {

        document
          .getElementById("events-section")
          ?.scrollIntoView({
            behavior: "smooth"
          });

      }
    }}
  >
    Events
  </button>

          {/* ONLY FOR USERS */}
{!isAdmin && (
  <>
    <Link
      className="hover:text-blue-400 transition"
      to="/notice-board"
    >
      Notice Board
    </Link>

    <Link
      className="hover:text-blue-400 transition"
      to="/my-events"
    >
      My Events
    </Link>

    <Link
      className="hover:text-blue-400 transition"
      to="/recommendations"
    >
      Recommendations
    </Link>
  </>
)}

          {isAdmin && (
            <>
              <Link
                className="hover:text-blue-400 transition"
                to="/dashboard"
              >
                Dashboard
              </Link>

              <Link
                className="hover:text-blue-400 transition"
                to="/attendees"
              >
                Attendees
              </Link>

              <Link
                className="hover:text-blue-400 transition"
                to="/ai-report"
              >
                AI Reports
              </Link>

              <Link
                className="text-green-400 hover:text-green-300 transition"
                to="/create-event"
              >
                Create Event
              </Link>
            </>
          )}

          <Link
            className="hover:text-blue-400 transition"
            to="/register"
          >
            Register
          </Link>

          <Link
            className="hover:text-blue-400 transition"
            to="/login"
          >
            Login
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 transition px-4 py-1 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (

        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-black border-t border-gray-800">

          <Link
            className="hover:text-blue-400 transition"
            to="/notice-board"
            onClick={() => setMenuOpen(false)}
          >
            Notice Board
          </Link>

          <Link
            className="hover:text-blue-400 transition"
            to="/my-events"
            onClick={() => setMenuOpen(false)}
          >
            My Events
          </Link>

          <Link
            className="hover:text-blue-400 transition"
            to="/recommendations"
            onClick={() => setMenuOpen(false)}
          >
            Recommendations
          </Link>

          {isAdmin && (
            <>
              <Link
                className="hover:text-blue-400 transition"
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                className="hover:text-blue-400 transition"
                to="/attendees"
                onClick={() => setMenuOpen(false)}
              >
                Attendees
              </Link>

              <Link
                className="hover:text-blue-400 transition"
                to="/ai-report"
                onClick={() => setMenuOpen(false)}
              >
                AI Reports
              </Link>

              <Link
                className="text-green-400 hover:text-green-300 transition"
                to="/create-event"
                onClick={() => setMenuOpen(false)}
              >
                Create Event
              </Link>
            </>
          )}

          <Link
            className="hover:text-blue-400 transition"
            to="/register"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>

          <Link
            className="hover:text-blue-400 transition"
            to="/login"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg w-fit"
          >
            Logout
          </button>

        </div>

      )}

    </nav>
  );
}