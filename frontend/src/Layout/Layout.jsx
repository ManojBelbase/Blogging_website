import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
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
