import React from "react";
import { Box, Heading, Text, Flex, Image } from "@chakra-ui/react";
import team from "../Hero";
import ceo from "/src/assets/ceo.jpg";

const AboutUs = () => {
  return (
    <Flex direction={"column"}>
      <Box textAlign={"center"} p={6} h={32} color={"white"} bg={"gray.500"}>
        <Heading mb={2} size={{ base: "md", md: "lg" }} mx={"auto"}>
          About us
        </Heading>
        <Text color={"gray.200"} fontSize={{ base: "sm", md: "lg" }}>
          Telling our inspiring story from the very begining to our days
        </Text>
      </Box>
      <Flex
        p={2}
        alignItems={{ base: "flex-start", md: "center" }}
        justifyContent={"space-between"}
        direction={{ base: "column", md: "row" }}
        mt={6}
        mx={"auto"}
        maxW={600}
      >
        <Heading
          mb={4}
          justifySelf={"space-between"}
          size={{ base: "md", md: "lg" }}
        >
          Behind The Success
        </Heading>
        <Text width={{ base: "100%", md: "50%" }}>
          Mazeltov Commercial Agency is the last commercial Agency you’ll ever
          have to call. Whether you’re your financial Airtel Products and
          Services needs are simple or complicated, from loan on items to Airtel
          Products and services, we will attend to them efficiently. We quote
          promptly, deliver neatly and on time, and always keep you in the loop.
          Our team has over five years’ experience and all our work is full
          standards compliant.
        </Text>
      </Flex>
    </Flex>
  );
};

export default AboutUs;
