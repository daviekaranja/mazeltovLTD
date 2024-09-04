import React from "react";
import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  FormHelperText,
} from "@chakra-ui/react";

const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "@Mazeltov24",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  return (
    <Box p={2}>
      <Box p={4} bg={"white"}>
        <Text>Active Users</Text>
        <Text fontSize={"sm"}>
          {" "}
          you have 0 active users, will appear here once you add them
        </Text>
      </Box>
      <Heading mt={2} textAlign={"center"} mb={4} size={"md"}>
        Add a new user
      </Heading>
      <Box mt={2} p={2} bg={"white"}>
        <Flex alignItems={"center"}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name" // Added name attribute to match the handleChange function
              value={user.name}
              onChange={handleChange} // Use the handleChange function
              width={64}
              type="text"
              placeholder="John Doe"
            />
          </FormControl>

          {/* email */}
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email" // Added name attribute to match the handleChange function
              value={user.email}
              onChange={handleChange} // Use the handleChange function
              width={64}
              type="email"
              placeholder="user@example.com"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <FormHelperText>The default password is @Mazeltov24</FormHelperText>
            <Input
              name="password" // Added name attribute to match the handleChange function
              value={user.password}
              onChange={handleChange} // Use the handleChange function
              width={64}
              type="text"
              placeholder="password"
            />
          </FormControl>
        </Flex>
        <Box display={"flex"} p={4} mt={2} mx={"auto"}>
          <Button color={"white"} bg={"brand.primary"} mx={"auto"}>
            Add User
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddUser;
