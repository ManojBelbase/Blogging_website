import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="px-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
