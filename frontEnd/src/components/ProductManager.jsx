import React, { useState, useEffect } from "react";
import { categories } from "../utils/utilities";
import Product from "./Product";
import axiosClient from "../api/axiosClient";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Select,
  Heading,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image_url: "",
    category: "",
    phone_number: "",
    description: "",
  });
  const validateForm = () => {
    const { name, price, image_url, category, phone_number, description } =
      newProduct;
    if (
      !name ||
      !price ||
      !image_url ||
      !category ||
      !phone_number ||
      !description
    ) {
      alert("Please fill in all the fields.");
      return false;
    }
    return true;
  };

  const handleSaveProduct = async () => {
    if (!validateForm()) return;

    try {
      const response = await axiosClient.post(
        "/products/create_product",
        newProduct
      );
      // Assuming the response contains the new product, add it to the products list
      setProducts([...products, response.data]);
      // Reset the form fields after successful submission
      setNewProduct({
        name: "",
        price: "",
        image_url: "",
        category: "",
        phone_number: "",
        description: "",
      });
    } catch (error) {
      console.error("Error saving product:", error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value, // Dynamically update the field based on the input's name
    }));
  };

  return (
    <Box
      rounded={"lg"}
      border={"1px"}
      borderColor={"gray.200"}
      p={2}
      bg={"white"}
      display={"flex"}
      flexDir={"column"}
      gap={6}
    >
      <Box mx={"auto"}>
        <Heading mt={2}>Add a new product</Heading>
        <Text>please fill in the poduct's details below</Text>
      </Box>
      <Flex width={"100%"} direction={"column"}>
        {/* name and category */}
        <Flex
          p={2}
          mt={4}
          justifyContent={"space-evenly"}
          width={"100%"}
          direction={["column", "row"]}
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Product's Name</FormLabel>

              <Input
                size={"md"}
                name="name"
                placeholder="products name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>
                Select Category
                <Select
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  placeholder="Select category"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </FormLabel>
            </FormControl>
          </Box>
        </Flex>

        {/* price and .. */}
        <Flex
          p={2}
          mt={4}
          justifyContent={"space-evenly"}
          width={"100%"}
          direction={["column", "row"]}
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                name="price"
                placeholder="Enter Price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
          {/* __________________________________ */}
          <Box>
            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phone_number"
                placeholder="0700 000 000"
                value={newProduct.phone_number}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
        </Flex>

        <Flex mt={4} p={2} width={"100%"} direction={"column"}>
          {/* image url and description */}
          <Box width={"60%"} mx={"auto"}>
            <FormControl isRequired>
              <FormLabel>Image Url</FormLabel>
              <Input
                name="image_url"
                placeholder="paste the image url here"
                value={newProduct.image_url}
                onChange={handleInputChange}
              />
            </FormControl>
            {/* __________________ */}
          </Box>
          <Box mt={4} width={"60%"} mx={"auto"}>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                placeholder="products description"
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
        </Flex>
      </Flex>
      <Text mx={"auto"} fontSize={"sm"}>
        Please ensure the phone number is registered on WhatsAap, we will
        redirect users to there
      </Text>
      <Button
        m={2}
        onClick={handleSaveProduct}
        colorScheme="'teal"
        mx={"auto"}
        width={"md"}
      >
        Save Product
      </Button>
    </Box>
  );
};

export default ProductManager;
