import React from "react";
import {
  Box,
  Flex,
  Link,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import { easeIn } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import Toast from "./Alerts/Toast";
import BuyAirtime from "./BuyAirtime";
import { useDisclosure } from "@chakra-ui/react";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Managing state for opening/closing
  const navigate = useNavigate(); // Correctly get the navigate function

  const handleNavigation = (path) => {
    navigate(path);
  };

  const links = ["Home", "About", "Support"];
  const dest = ["/", "/about", "/support"];

  const linksMap = links.map((link, index) => (
    <Link
      key={index}
      onClick={(e) => {
        e.preventDefault(); // Prevent default link behavior
        handleNavigation(dest[index]); // Programmatic navigation
      }}
      _hover={{
        textDecoration: "none",
        color: "yellow",
      }} // Optional: Add hover styles
      _active={{
        color: "yellow",
      }}
    >
      {link}
    </Link>
  ));

  return (
    <Box
      w={"100%"}
      position={"fixed"}
      h={20}
      p={2}
      color={"white"}
      bg={"brand.primary"}
      zIndex={"999"}
      alignItems={"center"}
      boxShadow={"md"}
      transition={easeIn}
    >
      <Flex
        p={2}
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={"row"}
      >
        <Link
          _hover={{ textDecoration: "none" }}
          fontSize={"lg"}
          fontWeight={"bold"}
        >
          Mazeltov
        </Link>
        <Box
          display={{ base: "none", md: "flex" }}
          fontWeight={"bold"}
          gap={{ base: 2, md: 4, lg: 6 }}
        >
          {linksMap}
        </Box>
        <Box>{/* just a placeholder */}</Box>
        {/* <Link
          display={{ base: "none", md: "flex" }}
          _hover={{ textDecoration: "none" }}
          padding={2}
          fontWeight={"bold"}
          rounded={"md"}
          bg={"white"}
          color={"brand.primary"}
          transition={easeIn}
          onClick={() => handleNavigation("/deals")}
        >
          Buy Airtime
        </Link> */}
        <HamburgerIcon
          boxSize={6}
          color={"white"}
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
        />

        {/* Mobile Menu Drawer */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>

            <DrawerBody>
              {/* Drawer Body containing menu items */}
              <VStack align="start" spacing={4}>
                <Link href="/">Home</Link>
                <Link href="/">Bingwa Sokoni Offers</Link>
                <Link href="/">Shop</Link>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};

export default NavBar;
