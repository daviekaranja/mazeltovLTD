import React, { useState, useEffect } from "react";
import { Flex, Text, Select, Box, Button } from "@chakra-ui/react";
import Product from "./Product";
import axiosClient from "../api/axiosClient";

const Services = ({ renderButtons }) => {
  const [localProds, setLocalProds] = useState(() => {
    const savedProds = localStorage.getItem("products");
    return savedProds ? JSON.parse(savedProds) : [];
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosClient.get("/products/get-products");

        // Save the new data to localStorage
        localStorage.setItem("products", JSON.stringify(data));

        // Update the state with the new data
        setLocalProds(data);

        // Extract and set categories
        const allCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(["All", ...allCategories]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? localProds
      : localProds.filter((product) => product.category === selectedCategory);

  return (
    <Flex p={2} direction={"column"}>
      <Flex alignItems={"center"} gap={5} justifyContent={"center"} mb={4}>
        <Text>Filter by category</Text>
        <Select
          width={"200"}
          placeholder="Select category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Flex>
      {/* Product List */}
      <Product products={filteredProducts} renderButtons={renderButtons} />
    </Flex>
  );
};

export default Services;
