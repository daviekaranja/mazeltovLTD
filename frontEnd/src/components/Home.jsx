import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import Hero from "./Hero";
import Services from "./Services";
import Sales from "./pages/DataAirtimeSales";

const Home = () => {
  return (
    <Box>
      <Hero />
      <Sales />
      <Services />
    </Box>
  );
};

export default Home;
