import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

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
  const [openProfile, setOpenProfile] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth(); // Access logout method from AuthProvider
  const navigate = useNavigate(); // To programmatically navigate

  // Logout
  const handleLogout = (e) => {
    e.preventDefault();
    const Logout = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/users/logout",
          { withCredentials: true }
        );

        // Check if the logout was successful
        if (response.status === 200) {
          setIsAuthenticated(false);
          toast.success("User Logout Successfully");
          navigate("/");
          location.reload();
        } else {
          console.log("Failed to logout: ", response.status);
          toast.error(
            "Failed to logout, server responded with status: " + response.status
          );
        }
      } catch (error) {
        console.error("Logout error: ", error.response || error);
        toast.error("Failed to logout. Please check your network or server.");
      }
    };

    Logout();
  };

  const handleProfileOpen = () => {
    setOpenProfile(!openProfile);
  };

  return (
    <nav className="flex relative items-center justify-between py-2 shadow-lg px-6 md:px-16 bg-blue-50">
      <div>
        <p className="text-xl font-semibold">
          Neplai<span className="text-blue-600">Blog</span>
        </p>
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
        {profile && profile?.data?.role === "admin" ? (
          <button className="outline-none text-black border border-black rounded-md px-2 py-1 text-lg">
            <Link to="/dashboard">Dashboard</Link>
          </button>
        ) : null}

        {profile ? (
          <div className="flex gap-2">
            <div className="h-12 w-12 rounded-full cursor-pointer relative">
              <img
                src={profile.data.photo.url}
                alt=""
                className="h-full w-full rounded-full border border-black"
                onClick={handleProfileOpen}
              />
              {openProfile ? (
                <div className="absolute border-black border p-2 bg-white rounded-sm right-0 z-20">
                  <div className="flex items-center gap-2 px-2 py-1 border border-black rounded-sm mb-2 hover:border-blue-500">
                    <CgProfile />
                    <p>{profile.data.name}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="outline-none border flex items-center gap-2 text-black rounded-sm px-2 py-1 border-black text-lg hover:border-red-700 hover:text-red-600"
                  >
                    <TbLogout2 />
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <button className="outline-none border border-black text-black hover:text-blue-700 hover:border-blue-600 rounded-md px-2 py-1 text-lg">
            <Link to="/login">Login</Link>
          </button>
        )}
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
        <ul className="flex flex-col items-center justify-center gap-3 bg-white w-full h-screen absolute top-10 left-0 z-50">
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
            {profile && profile?.data?.role === "admin" ? (
              <button className="outline-none bg-blue-700 text-white rounded-md px-4 py-2 text-lg">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            ) : null}

            {profile ? (
              <button
                onClick={handleLogout}
                className="outline-none bg-red-600 text-white rounded-md px-4 py-2 text-lg"
              >
                Logout
              </button>
            ) : (
              <button className="outline-none bg-blue-700 text-white rounded-md px-4 py-2 text-lg">
                <Link to="/login">Login</Link>
              </button>
            )}
          </div>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
