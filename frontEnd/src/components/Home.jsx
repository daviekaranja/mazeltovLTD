import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import Hero from "./Hero";
import Services from "./Services";
import Sales from "./pages/DataAirtimeSales";
import BuyAirtime from "./BingwaOffers";

const Home = () => {
  return (
    <div className="text-3xl flex flex-col text-gray-800 space-y-6 w-full justify-evenly">
      <Hero />
      <Sales />
      {/* <BuyAirtime /> */}
      {/* <Services /> */}
    </div>
  );
};

export default Home;
