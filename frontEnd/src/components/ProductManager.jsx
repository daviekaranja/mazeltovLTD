import {
  InputField,
  TextareaField,
  SelectField,
} from "../utils/UiComponents.jsx";
import { useAuth } from "./AuthProvider";
import React, { useReducer } from "react";
import { categories } from "../utils/utilities.js";
import axiosClient from "../api/axiosClient";
import { productSchema } from "../schemas/schemas.js";
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
import { z } from "zod";
import useProducts from "../hooks/useProducts.jsx";

const initialState = {
  name: "",
  price: "",
  image_url: "",
  category: "",
  phone_number: "",
  description: "",
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    case "SET_ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
}

const ProductManager = ({ initialProduct }) => {
  const { authToken, user } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialProduct || initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  const handleBlur = (e) => {
    let { name, value } = e.target;
    if (name === "phone_number" && value.startsWith("07")) {
      value = `+254${value.substring(1)}`;
      dispatch({ type: "SET_FIELD", field: name, value });
    }
  };

  const handleSaveProduct = async () => {
    try {
      state.price = Number(state.price);
      productSchema.parse(state); // Validate using Zod schema
      if (initialProduct) {
        await axiosClient.put(
          `/products/update_product/${initialProduct.id}`,
          state
        );
      } else {
        await axiosClient.post("/products/create_product", state);
      }
      dispatch({ type: "RESET" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Use error.format() to get specific field errors
        const formattedErrors = error.format();
        const errorMessages = [];

        // Loop through the formattedErrors and collect messages
        for (const field in formattedErrors) {
          if (field !== "_errors" && formattedErrors[field]?._errors.length) {
            errorMessages.push(
              `${field}: ${formattedErrors[field]._errors.join(", ")}`
            );
          }
        }

        // Join all error messages into one string
        const combinedErrorMessages = errorMessages.join("; ");
        dispatch({ type: "SET_ERROR", error: combinedErrorMessages });
      } else {
        dispatch({ type: "SET_ERROR", error: "An unknown error occurred" });
      }
    }
  };

  return (
    <Box
      mt={1}
      rounded="lg"
      border="1px"
      borderColor="gray.200"
      p={2}
      bg="white"
      display="flex"
      flexDir="column"
      gap={6}
    >
      <Box mx="auto">
        <Text mt={2}>
          {initialProduct ? "Edit Product" : "Add a new product"}
        </Text>
        <Text>
          {initialProduct
            ? "Update the product's details below"
            : "Please fill in the product's details below"}
        </Text>
      </Box>

      {state.error && (
        <Text px={4} color="red.500">
          {state.error}
        </Text>
      )}

      <Flex direction="column" p={4} gap={4}>
        <Flex gap={4}>
          <InputField
            size={"md"}
            label="Product Name"
            name="name"
            value={state.name}
            onChange={handleInputChange}
          />
          <InputField
            size={"md"}
            label="Price"
            name="price"
            type="text"
            value={state.price}
            onChange={handleInputChange}
          />
          <InputField
            size={"md"}
            label="Phone Number"
            name="phone_number"
            value={state.phone_number}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </Flex>

        <Flex gap={4}>
          <InputField
            size={"md"}
            label="Image URL"
            name="image_url"
            value={state.image_url}
            onChange={handleInputChange}
          />
          <SelectField
            size={"md"}
            label="Category"
            name="category"
            value={state.category}
            onChange={handleInputChange}
            options={categories}
          />
        </Flex>

        <TextareaField
          size={"md"}
          label="Description"
          name="description"
          value={state.description}
          onChange={handleInputChange}
        />
      </Flex>

      <Button
        mb={2}
        onClick={handleSaveProduct}
        bg="brand.primary"
        mx="auto"
        width="md"
        color="white"
        _hover={{ bg: "blue.500" }}
      >
        {initialProduct ? "Update Product" : "Save Product"}
      </Button>
    </Box>
  );
};

export default ProductManager;
