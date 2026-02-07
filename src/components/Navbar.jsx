// components/Navbar.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onLogout, title = "Task Manager" }) {
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    setDropdownOpen(false); // close dropdown
    navigate(path);
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      {/* App Name */}
      <h1
        className="text-2xl font-bold text-pink-600 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        {title}
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4 relative">
        {user ? (
          <>
            <span className="text-pink-500 hidden sm:inline">Hello, {user.name}</span>
            <div className="relative">
              <img
                src={user.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-pink-500 cursor-pointer object-cover"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-pink-50">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-pink-50 text-pink-600 transition-colors"
                    onClick={() => handleNavigate("/profile")}
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-pink-50 text-pink-600 transition-colors"
                    onClick={() => handleNavigate("/about")}
                  >
                    About
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-pink-50 text-pink-600 transition-colors"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-pink-500 text-white px-6 py-2 rounded-full font-medium hover:bg-pink-600 transition-colors shadow-sm"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
