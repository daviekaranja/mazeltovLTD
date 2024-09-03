import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Flex mx={"auto"} direction={"column"} minHeight={"100vh"}>
      <Box h={20}>
        <Navbar />
      </Box>
      <Flex flex={"1"} direction={"column"}>
        {children}
      </Flex>
      <Box as={"footer"} mt={"auto"}>
        <Footer />
      </Box>
    </Flex>
  );
};

export default Layout;
