import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import {
  Box,
  Text,
  Flex,
  Image,
  SimpleGrid,
  Button,
  Card,
  CardBody,
  Heading,
} from "@chakra-ui/react";

const Product = ({ products }) => {
  const location = useLocation();

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  const handleOrder = (product) => {
    // Generate a WhatsApp message
    const message = `
    Hello, I'm interested in this product
    Product Name: ${product.name}
    Price: Kshs ${product.price}
    Image: ${product.image_url}
  `;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <SimpleGrid gap={2} columns={[1, 3, 4]} p={1} bg={"gray.50"}>
      {products.map((product, index) => (
        <Card
          _hover={{
            boxShadow: "md",
          }}
          key={index}
          border="1px"
          borderColor="gray.300"
          color="gray.500"
          overflow="hidden"
          height="400px" // Example height for the card
          // maxW={{ base: "400px", md: "500px" }}
        >
          <CardBody p={1}>
            <Box overflow={"hidden"} h={"45%"} width={"100%"}>
              {/* This makes the image take 50% of the card's height */}
              <Image
                src={product.image_url}
                rounded={"md"}
                alt={product.name}
                objectFit="cover"
                height="100%" // Ensure the image takes up the full height of the Box
                width="100%" // Ensure the image takes up the full width of the Box
                maxHeight="200px" // Example maximum height to prevent unwanted behaviors
              />
            </Box>
            <Box p={1}>
              <Text
                color={"blue.400"}
                fontWeight={"bold"}
                fontSize={"24px"}
                noOfLines={1}
              >
                {product.name}
              </Text>
              <Text
                fontWeight={"semibold"}
                color={"green.500"}
                fontSize={"20px"}
              >
                Kshs {product.price}
              </Text>
              <Flex
                fontSize={"14px"}
                fontWeight={"normal"}
                justifyContent={"space-between"}
              >
                <Text fontSize={"14px"} color={"gray.400"}>
                  Discount: 0.0%
                </Text>
                {/* <Text color={"green"}>in stock</Text> */}
              </Flex>
              <Text
                pt={1}
                fontWeight={"normal"}
                noOfLines={2}
                color={"gray.500"}
                fontSize={"14px"}
              >
                {product.description}
              </Text>
            </Box>
            <Flex
              mt={2}
              p={1}
              direction={"row"}
              justifyContent={"space-evenly"}
              width={"100%"}
            >
              {location.pathname === "/manage" ? (
                <Flex p={2} width={"100%"} justifyContent={"space-evenly"}>
                  <Button size={"lg"} color={"white"} bg={"blue.300"}>
                    Edit
                  </Button>
                  <Button size={"lg"} color={"white"} bg={"red.500"}>
                    Delete
                  </Button>
                </Flex>
              ) : (
                <Flex p={2} width={"100%"} justifyContent={"space-between"}>
                  <Button size={"lg"} onClick={() => addToCart(product)}>
                    Cart
                  </Button>
                  <Button
                    size={"lg"}
                    onClick={() => handleOrder(product)}
                    bg={"green.500"}
                    color={"white"}
                  >
                    Order
                  </Button>
                </Flex>
              )}
            </Flex>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default Product;
