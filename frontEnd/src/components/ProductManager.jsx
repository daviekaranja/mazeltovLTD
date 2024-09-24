import { useAuth } from "./AuthProvider";
import React, { useState, useEffect } from "react";
import { categories } from "../utils/utilities.js";
import axiosClient from "../api/axiosClient";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Select,
  Heading,
  Text,
  Textarea,
} from "@chakra-ui/react";

const ProductManager = ({ initialProduct }) => {
  const { authToken, user, isLoading } = useAuth();
  // Initialize the newProduct state with the provided product or an empty object
  const [newProduct, setNewProduct] = useState(
    initialProduct || {
      name: "",
      price: "",
      image_url: "",
      category: "",
      phone_number: "",
      description: "",
    }
  );

  const validateForm = () => {
    const {
      name,
      price,
      image_url,
      category,
      phone_number,
      owner_id,
      description,
    } = newProduct;
    if (
      !name ||
      !price ||
      !image_url ||
      !category ||
      !phone_number ||
      !owner_id ||
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
      if (initialProduct) {
        await axiosClient.put(
          `/products/update_product/${initialProduct.id}`,
          newProduct
        );
        // Add your code here to update the products list after editing
      } else {
        // Save new product
        const response = await axiosClient.post(
          "/products/create_product",
          newProduct
        );
        // Assuming the response contains the new product, add it to the products list
        // Add your code here to update the products list with the new product
      }

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    let { name, value } = e.target;

    // Transform the phone number on blur
    if (name === "phone_number" && value.startsWith("07")) {
      value = `+254${value.substring(1)}`;
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
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
        <Heading mt={2}>
          {initialProduct ? "Edit Product" : "Add a new product"}
        </Heading>
        <Text>
          {initialProduct
            ? "Update the product's details below"
            : "Please fill in the product's details below"}
        </Text>
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
                placeholder="Product's name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Select Category</FormLabel>
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
              {/* </FormLabel> */}
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
          <Box>
            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="text"
                name="phone_number"
                placeholder="0700 000 000"
                value={newProduct.phone_number}
                onChange={handleInputChange}
                onBlur={handleBlur}
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
                placeholder="Paste the image URL here"
                value={newProduct.image_url}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
          <Box mt={4} width={"60%"} mx={"auto"}>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                placeholder="Product's description"
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
        </Flex>
      </Flex>
      <Text mx={"auto"} fontSize={"sm"}>
        Please ensure the phone number is registered on WhatsApp; we will
        redirect users there.
      </Text>
      <Button
        m={2}
        onClick={handleSaveProduct}
        bg={"teal"}
        mx={"auto"}
        width={"md"}
        color={"white"}
        _hover={{
          bg: "brand.primary",
        }}
      >
        {initialProduct ? "Update Product" : "Save Product"}
      </Button>
    </Box>
  );
};

export default ProductManager;
