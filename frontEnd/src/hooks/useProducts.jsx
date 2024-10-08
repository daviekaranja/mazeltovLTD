import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import ApiService from "../utils/ApiService";

const useProducts = () => {
  const [localProds, setLocalProds] = useState([]);

  // Fetch products from the API and save them in both state and localStorage
  const fetchProducts = async () => {
    try {
      const { data } = await ApiService.get("/products/get-products");

      // Save products to localStorage
      localStorage.setItem("products", JSON.stringify(data));

      // Update local state
      setLocalProds(data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // Function to delete a product
  const deleteProduct = async (productId) => {
    try {
      return await ApiService.delete(`/products/remove-product/${productId}`);

      // Refetch products after deletion
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  // Function to update a product
  const updateProduct = async (productId, updatedProduct) => {
    try {
      return await ApiService.put(
        `/products/update_product/${productId}`,
        updatedProduct
      );

      // Refetch products after update
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  // Function to add a new product
  const addProduct = async (newProduct) => {
    try {
      await axiosClient.post("/products/create_product", newProduct);

      // Refetch products after adding a new product
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  // Load products from localStorage initially
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setLocalProds(storedProducts);

    // Optionally fetch products from the server on mount
    fetchProducts();
  }, []);

  return {
    localProds,
    fetchProducts,
    deleteProduct,
    updateProduct,
    addProduct,
  };
};

export default useProducts;
