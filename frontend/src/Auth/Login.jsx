import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic front-end validation
    if (!role || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("User logged in successfully");
        setIsAuthenticated(true);
        // Navigate to the home page after successful login
        navigate("/");
        location.reload();
      }

      // Clear form fields
      setRole("");
      setEmail("");
      setPassword("");
    } catch (error) {
      // Check if the error has a response and display a user-friendly message
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md bg-white rounded-md p-8">
        <form onSubmit={handleLogin}>
          <div className="text-center mb-2">
            <p className="text-xl font-semibold">Logo</p>
          </div>

          {/* Role Selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border-2 w-full mb-2 outline-none rounded-md"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Email */}
          <div className="mb-2">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 outline-none border-2 rounded-md"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 outline-none border-2 rounded-md"
            />
          </div>
          <p className="text-center mb-2">
            New User?
            <Link to="/register" className="text-blue-600">
              Register Now
            </Link>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 rounded-md outline-none text-white p-2 mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
