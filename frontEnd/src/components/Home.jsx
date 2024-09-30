import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import Hero from "./Hero";
import Services from "./Services";

const Home = () => {
  return (
    <Box>
      <Hero />
      <Services />
    </Box>
  );
};

export default Home;
