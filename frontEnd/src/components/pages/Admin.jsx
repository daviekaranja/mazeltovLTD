import React, { useState } from "react";
import ProductManager from "../ProductManager";
import Services from "../Services";
import Dashboard from "../DashBoard";
import AddUser from "../AddUser";
import Users from "../Users";

import { Box, Link, Text, Flex, Button, Grid } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const AdminPage = () => {
  const [userData, setUserData] = useState(null);
  const [navSize, changeNavSize] = useState("large");
  const tabs = ["Home", "Access", "Products", "Settings"];
  const [activeTab, setActiveTab] = useState(null);

  const CustomButtons = (product) => {
    return (
      <Flex
        justifyContent={"space-between"}
        direction={"row"}
        width={"100%"}
        p={2}
      >
        <Button
          onClick={() =>
            setActiveComponent(<ProductManager initialProduct={product} />)
          }
          color={"white"}
          bg={"blue.500"}
        >
          Update
        </Button>
        <Button color={"white"} bg={"red"}>
          Delete
        </Button>
      </Flex>
    );
  };
  const linksComponents = {
    0: <Dashboard />,
    1: () => {
      return (
        <Box width={"100%"} p={2} rounded={"lg"} h={"70vh"} bg={"gray.50"}>
          <Box h={"70vh"} overflow={"auto"}>
            <Services renderButtons={CustomButtons} />
          </Box>

          <Flex justifyContent={"center"} p={"2"} width={"100%"}>
            <Button
              onClick={() => setActiveComponent(<ProductManager />)}
              color={"white"}
              bg={"blue.500"}
            >
              Add Products
            </Button>
          </Flex>
        </Box>
      );
    },

    2: (product) => {
      <Box>
        <ProductManager initialProduct={product} />
      </Box>;
    },
    2: <Users />,
  };
  const [activeComponent, setActiveComponent] = useState(linksComponents[0]);

  const links = ["Dashboard", "Products", "Roles", "Social", "Settings"];

  const pages = ["Landing", "Hero", "Services", "About"];
  const pagesMap = pages.map((page, index) => {
    return (
      <Link
        fontSize={"18px"}
        _hover={{
          textDecoration: "none",
          color: "brand.primary",
        }}
        _active={{
          color: "brand.primary",
          padding: 2,
        }}
        key={index}
      >
        {page}
      </Link>
    );
  });

  const linksmap = links.map((link, index) => {
    return (
      <Link
        fontSize={"18px"}
        _hover={{
          textDecoration: "none",
          color: "brand.primary",
        }}
        _active={{
          color: "brand.primary",
        }}
        key={index}
        onClick={() => setActiveComponent(linksComponents[index])}
      >
        {link}
      </Link>
    );
  });
  return (
    <Box color={"gray.500"} bg={"gray.100"}>
      <Box p={2} bg={"gray.100"}>
        <Flex
          height={50}
          alignItems={"center"}
          width={300}
          justifyContent={"space-between"}
        >
          <HamburgerIcon
            onClick={() => {
              navSize === "large"
                ? changeNavSize("small")
                : changeNavSize("large");
            }}
            boxSize={6}
          />
          <Text color={"gray.500"} fontWeight={"semibold"} fontSize={"24px"}>
            Mazeltov Agencies
          </Text>
        </Flex>
      </Box>
      <Grid
        templateColumns="300px 1fr"
        gap={4}
        minH={"100vh"}
        spacing={2}
        columns={2}
      >
        <Flex
          direction={"column"}
          maxW={navSize === "large" ? 300 : 50}
          height={"100%"}
          p={1}
        >
          <Box boxShadow={"sm"} rounded={"lg"} bg={"gray.50"}>
            <Flex p={4} gap={2} direction={"column"} width={"100%"}>
              {linksmap}
            </Flex>
          </Box>
          <Text fontSize={"md"} mt={2} color={"gray.400"}>
            Pages
          </Text>
          <Flex
            mt={2}
            rounded={"lg"}
            p={4}
            gap={2}
            direction={"column"}
            bg={"gray.50"}
          >
            {pagesMap}
          </Flex>
        </Flex>
        <Box>{activeComponent}</Box>
      </Grid>
    </Box>
  );
};
export default AdminPage;
