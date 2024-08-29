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
  CardFooter,
  CardHeader,
} from "@chakra-ui/react";
import { easeIn } from "framer-motion";

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
            borderColor: "brand.primary",
            boxShadow: "lg",
            transition: easeIn,
          }}
          overflow={"hidden"}
          border={"1px"}
          borderColor={"gray.300"}
        >
          <CardBody pt={1}>
            <Image
              mx={"auto"}
              width={"100"}
              maxH={200}
              objectFit={"center"}
              src={product.image_url}
            />
            <Flex direction={"column"}>
              <Heading color={"brand.primary"} mx={"auto"} size={["md", "lg"]}>
                {product.name}
              </Heading>
              <Text
                fontSize={"md"}
                h={"64px"}
                noOfLines={2}
                p={1}
                overflow={"hidden"}
                textAlign={"center"}
              >
                {product.description}
              </Text>
              <Heading
                textAlign={"center"}
                size={"md"}
                fontWeight={"bold"}
                color={"green.500"}
              >
                Kshs {product.price}
              </Heading>
            </Flex>
          </CardBody>
          <CardFooter pt={0} bg={"gray.50"}>
            <Box
              p={2}
              justifyContent={"space-between"}
              width="100%"
              display={"flex"}
            >
              <Button size={["md", "lg"]} transition={easeIn}>
                Cart
              </Button>
              <Button
                size={["md", "lg"]}
                transition={easeIn}
                bg={"blue.500"}
                color={"white"}
                _hover={{
                  color: "brand.primary",
                  bg: "gray.200",
                }}
              >
                Order
              </Button>
            </Box>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default Product;
