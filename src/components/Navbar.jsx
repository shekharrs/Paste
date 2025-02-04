import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply the theme class to the body when the theme changes
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex flex-row gap-12 justify-center items-center border p-4 rounded-full 
                    bg-gray-200 dark:bg-gray-900 shadow-lg transition-all">
      {/* Navigation Links */}
      <NavLink
        className="text-2xl font-semibold text-transparent bg-clip-text 
                   bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 transition-all"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className="text-2xl font-semibold text-transparent bg-clip-text 
                   bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 transition-all"
        to="/pastes"
      >
        Pastes
      </NavLink>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="px-5 py-2 text-lg rounded-full font-medium 
                   bg-purple-500 text-white hover:bg-purple-600 transition-all shadow-md"
      >
        {theme === "light" ? "Dark Mode 🌙" : "Light Mode ☀️"}
      </button>
    </div>
  );
};

export default Navbar;