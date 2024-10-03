import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

const navItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Blogs",
    path: "/blogs",
  },
  {
    title: "Creators",
    path: "/creators",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex relative items-center justify-between py-2 shadow-lg px-6 md:px-16 bg-blue-50">
      <div>
        <p className="text-xl font-semibold">Logo</p>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8">
        {navItems.map((nav, i) => (
          <li key={i} className="text-xl">
            <NavLink
              className={({ isActive }) =>
                isActive ? "border-blue-500 border-b-2" : "text-black"
              }
              to={nav.path}
            >
              {nav.title}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <button className="outline-none bg-blue-700 text-white rounded-md px-4 py-2 text-lg">
          <Link to="/dashboard">Dashboard</Link>
        </button>
        <button className="outline-none bg-red-700 text-white rounded-md px-4 py-2 text-lg">
          Logout
        </button>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div
        onClick={() => setShowMenu(!showMenu)}
        className="md:hidden cursor-pointer"
      >
        {showMenu ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <ul className="flex flex-col items-center justify-center gap-3 bg-white w-full h-screen absolute top-10 left-0 ">
          {navItems.map((nav, i) => (
            <li key={i} className="text-xl">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border-blue-500 border-b-2" : "text-black"
                }
                to={nav.path}
                onClick={() => setShowMenu(false)} // close menu when clicked
              >
                {nav.title}
              </NavLink>
            </li>
          ))}
          <div className="flex flex-col items-center gap-4">
            <button className="outline-none bg-blue-700 text-white rounded-md px-4 py-2 text-lg">
              <Link to="/dashboard">Dashboard</Link>
            </button>
            <button className="outline-none bg-red-700 text-white rounded-md px-4 py-2 text-lg">
              Logout
            </button>
          </div>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
