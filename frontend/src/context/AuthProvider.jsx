// src/context/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/users/my-profile",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProfile(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/blogs/all-blogs",
          {
            withCredentials: true,
          }
        );
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{ blogs, profile, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
