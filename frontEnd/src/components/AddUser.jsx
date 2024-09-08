import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { userSchema } from "../schemas/schemas";
import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";

const AddUser = ({ onUserAdded }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "@Mazeltov24", // Default password
  });
  const [formErrors, setFormErrors] = useState({});
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validateUser = (userData) => {
    try {
      userSchema.parse(userData);
      return null;
    } catch (error) {
      if (error.errors) {
        const errors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        return errors;
      }
      return { general: "Validation failed" };
    }
  };

  const newUser = async (userData) => {
    const validationErrors = validateUser(userData);
    if (validationErrors) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      const response = await axiosClient.post("/users/create-user", userData);
      if (response.status === 201) {
        setUser({
          name: "",
          email: "",
          password: "@Mazeltov24", // Reset default password
        });
        if (onUserAdded) {
          onUserAdded(); // Call the callback function to refresh the user list
        }
        toast({
          title: "User added.",
          description: "The user has been successfully added.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else if (response.status === 409) {
        toast({
          title: "Conflict.",
          description: "A user with this information already exists.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      } else if (response.status === 500) {
        toast({
          title: "Server Error.",
          description: "An unexpected error occurred on the server.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Request failed.",
          description: "Unexpected status code: " + response.status,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Handle network or other errors
      const errorMessage =
        error.response && error.response.data
          ? error.response.data["detail"]
          : error.message || "An unknown error occurred";

      toast({
        title: "Error occurred.",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={2}>
      <Text textAlign={"center"} color={"gray.600"}>
        Add a new user
      </Text>
      <Box mt={2} p={2} bg={"white"}>
        {formErrors.general && (
          <Text fontSize={"sm"} textAlign={"center"} color={"red"}>
            {formErrors.general}
          </Text>
        )}
        <Flex direction="row" gap={4}>
          {/* Name */}
          <FormControl isRequired isInvalid={!!formErrors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              h={8}
              name="name"
              value={user.name}
              onChange={handleChange}
              width={64}
              type="text"
              placeholder="John Doe"
            />
            <FormHelperText color="red.500">{formErrors.name}</FormHelperText>
          </FormControl>

          {/* Email */}
          <FormControl isRequired isInvalid={!!formErrors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={user.email}
              onChange={handleChange}
              width={64}
              type="email"
              placeholder="user@example.com"
            />
            <FormHelperText color="red.500">{formErrors.email}</FormHelperText>
          </FormControl>

          {/* Password */}
          <FormControl isRequired isInvalid={!!formErrors.password}>
            <FormLabel>Password</FormLabel>
            <FormHelperText>The default password is @Mazeltov24</FormHelperText>
            <Input
              name="password"
              value={user.password}
              onChange={handleChange}
              width={64}
              type="text"
              placeholder="password"
            />
            <FormHelperText color="red.500">
              {formErrors.password}
            </FormHelperText>
          </FormControl>
        </Flex>
        <Box display={"flex"} p={4} mt={2} mx={"auto"}>
          <Button
            color={"white"}
            bg={"brand.primary"}
            mx={"auto"}
            onClick={() => newUser(user)}
          >
            Add User
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddUser;
