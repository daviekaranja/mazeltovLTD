import React from "react";
import {
  Box,
  Text,
  Flex,
  Image,
  SimpleGrid,
  Button,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { easeIn } from "framer-motion";

const Product = ({ products, renderButtons }) => {
  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

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

  const defaultButtons = (product) => (
    <Box p={2} justifyContent={"space-between"} width="100%" display={"flex"}>
      <Button
        color={"gray.700"}
        size={"md"}
        transition={easeIn}
        bg={"gray.200"}
        onClick={() => addToCart(product)}
      >
        add to cart
      </Button>
      <Button
        onClick={() => handleOrder(product)}
        size={"md"}
        transition={easeIn}
        bg={"blue.500"}
        color={"white"}
        _hover={{
          color: "white",
          bg: "blue.600",
        }}
      >
        Order
      </Button>
    </Box>
  );

  return (
    <SimpleGrid gap={2} columns={[1, 3, 4]} p={1} bg={"gray.50"}>
      {products.map((product, index) => (
        <Card
          key={index}
          bg={"white"}
          border={"1px"}
          borderColor={"gray.300"}
          width={["100%", "300px"]}
          overflow={"hidden"}
          _hover={{ borderColor: "brand.primary" }}
        >
          <CardBody p={0}>
            <Image
              src={product.image_url}
              width="100%"
              height={["170px", "250px"]}
              objectFit="cover"
              transition={"ease-in-out"}
            />
            <Flex p={2} direction={"column"}>
              <Text color={"gray.600"} fontSize={[25, 35]}>
                {product.name}
              </Text>
              <Text fontSize={["16px", "20px"]} color="gray.500">
                Kshs {product.price}
              </Text>
              <Text fontSize={"12px"} color="gray.400">
                Discount: 0.00%
              </Text>
            </Flex>
          </CardBody>
          <CardFooter p={1}>
            {renderButtons ? renderButtons(product) : defaultButtons(product)}
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default Product;
