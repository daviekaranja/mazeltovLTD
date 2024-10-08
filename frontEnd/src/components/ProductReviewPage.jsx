import { Box, Heading, Flex, Text, Image, Button } from "@chakra-ui/react";
import React from "react";
import { useLocation, useParams } from "react-router-dom";

const ProductReview = () => {
  const { productName } = useParams(); // Get product name from URL
  const location = useLocation();
  const { product } = location.state || {}; // Destructure product from state

  const handleOrder = (product) => {
    const message = `
      Hello, I'm interested in this product
      Product Name: ${product.name}
      Price: Kshs ${product.price}
      Image: ${product.image_url}
    `;
    const whatsappUrl = `https://wa.me/${
      product.phone_number
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Box
      minH={"100vh"}
      mt={1}
      p={1}
      mx={"auto"}
      width={{ base: "100%", md: "75%" }}
    >
      <Flex
        p={1}
        bg={"white"}
        direction={{ base: "column", md: "row" }}
        gap={2}
      >
        <Box>
          <Image
            objectPosition={"center"}
            h={200}
            src="https://i.postimg.cc/m2Pr6zG5/download.jpg"
          />
          <Box h={12} mt={1} bg={"gray.50"}></Box>
        </Box>
        <Box>
          <Box p={1} flex={1}>
            <Text fontSize={["md", "lg"]}>
              Dp Light LED Rechargeable Bulb With USB - 20 W
            </Text>
            <Text mt={1} fontSize={"md"} fontWeight={"bold"}>
              Ksh {product.price}
            </Text>
            <Text fontSize={"xs"}>In Stock</Text>
            <Text mt={2} fontSize={"sm"}>
              we will deliver the product anywhere in the country
            </Text>
            <Text fontSize={"sm"}>(No ratings available)</Text>
          </Box>
        </Box>
      </Flex>
      <Box p={2} mt={2} bg={"white"}>
        <Text mb={2} fontSize={"md"}>
          Product Description
        </Text>
        <Text fontSize={"sm"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          sapiente iusto praesentium eveniet, odit perferendis dolore, dolores
          voluptatum eos laborum dolorem ex ipsa excepturi? Id ab suscipit enim
          quisquam vero?
        </Text>
      </Box>
      <Box flexDirection={"column"} alignItems={"center"} display={"flex"}>
        <Button
          onClick={() => handleOrder(product)}
          width={"50%"}
          bg={"green.500"}
          color={"white"}
          mt={2}
          mx={"auto"}
        >
          Order
        </Button>
        <Text mt={1} fontSize={"9"}>
          Terms and Conditions Apply
        </Text>
      </Box>
    </Box>
  );
};

export default ProductReview;
