import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { MdOutlineMenu } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
const Sidebar = ({ setComponent }) => {
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleComponent = (value) => {
    setComponent(value);
  };

  const GotoHome = () => {
    navigate("/");
  };

  const handleLogout = (e) => {
    e.preventDefault();

    const Logout = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/users/logout",
          { withCredentials: true }
        );
        setIsAuthenticated(false);
        toast.success("User Logout Successfully");
        navigate("/");
      } catch (error) {
        toast.error("Failed to logout");
      }
    };
    Logout();
  };

  return (
    <div className="absolute">
      <div className="w-full block md:hidden" onClick={() => setShow(!show)}>
        {!show ? (
          ""
        ) : (
          <MdOutlineMenu className="text-2xl  fixed top-2 left-3" />
        )}
      </div>
      {/* sidebar */}
      <div
        className={`w-56 relative border h-screen pt-7 shadow-lg transform transition duration-300 z-30 ${
          show ? "hidden" : "block"
        }
        } bg-blue-50`}
      >
        {/* Close Icon */}
        <div
          className="absolute right-2 md:hidden "
          onClick={() => setShow(!show)}
        >
          {!show ? <FaArrowLeft /> : ""}
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 ">
            <img
              src={profile?.data?.photo?.url}
              alt={profile?.data?.name}
              className="w-full h-full rounded-full"
            />
          </div>
          <p>{profile?.data?.name}</p>
          <div className="mt-7 flex flex-col gap-4">
            <button
              onClick={() => handleComponent("My Profile")}
              className="px-4 uppercase py-1 outline-none rounded-md border-black text-black border-2"
            >
              My Profile
            </button>
            <button
              onClick={() => handleComponent("My Blogs")}
              className="px-8 uppercase border-black text-black py-1 outline-none rounded-md  border-2"
            >
              My Blogs
            </button>
            <button
              onClick={() => handleComponent("Create Blog")}
              className="px-8 py-1 uppercase border-2 border-black text-black outline-none rounded-md"
            >
              Create Blogs
            </button>

            <button
              onClick={GotoHome}
              className="px-8 py-1 uppercase border-2 border-black text-black outline-none rounded-md"
            >
              Home
            </button>
            <button
              onClick={handleLogout}
              className="px-8 py-1 uppercase border-2 border-black text-black  outline-none rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
