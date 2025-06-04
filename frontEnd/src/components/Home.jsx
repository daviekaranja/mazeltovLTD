import React from "react";
import Hero from "./Hero";
import Sales from "./pages/DataAirtimeSales";

const Home = () => {
  return (
    <div className="text-3xl  flex flex-col text-gray-800 space-y-6 w-full justify-evenly">
      <Hero />
      <Sales />
    </div>
  );
};

export default Home;
