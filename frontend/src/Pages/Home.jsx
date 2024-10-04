import React from "react";
import Hero from "../Home/Hero";
import Trending from "../Home/Trending";
import Tech from "../Home/Tech";
import Creator from "../Home/Creator";

const Home = () => {
  return (
    <div className="md:p-6">
      <Hero />
      <Trending />
      <Tech />
      <Creator />
    </div>
  );
};

export default Home;
