import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/blogs/all-blogs"
        );
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <AuthContext.Provider value={{ blogs }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
