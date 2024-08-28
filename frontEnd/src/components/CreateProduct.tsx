import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Define your Zod schema
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  image_url: z.string().url("Invalid URL"),
  category: z.string().min(1, "Category is required"),
});

// TypeScript type for the form data
type ProductFormData = z.infer<typeof productSchema>;

const ProductForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });
  const toast = useToast();

  // Handle form submission
  const onSubmit = async (data: ProductFormData) => {
    try {
      // Replace this with your API call to save the product
      console.log("Product data:", data);
      toast({
        title: "Product created.",
        description: "We've created your product.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error.",
        description: "Failed to create product.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={4} isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Product Name</FormLabel>
          <Input id="name" placeholder="Product name" {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </FormControl>

        <FormControl mb={4} isInvalid={!!errors.description}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            id="description"
            placeholder="Description"
            {...register("description")}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </FormControl>

        <FormControl mb={4} isInvalid={!!errors.price}>
          <FormLabel htmlFor="price">Price</FormLabel>
          <Input
            id="price"
            type="number"
            placeholder="Price"
            {...register("price")}
          />
          {errors.price && <span>{errors.price.message}</span>}
        </FormControl>

        <FormControl mb={4} isInvalid={!!errors.image_url}>
          <FormLabel htmlFor="image_url">Image URL</FormLabel>
          <Input
            id="image_url"
            placeholder="Image URL"
            {...register("image_url")}
          />
          {errors.image_url && <span>{errors.image_url.message}</span>}
        </FormControl>

        <FormControl mb={4} isInvalid={!!errors.category}>
          <FormLabel htmlFor="category">Category</FormLabel>
          <Input
            id="category"
            placeholder="Category"
            {...register("category")}
          />
          {errors.category && <span>{errors.category.message}</span>}
        </FormControl>

        <Button colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
