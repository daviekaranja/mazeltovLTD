import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import axiosClient from "../api/axiosClient";
import {
  FormControl,
  FormLabel,
  Text,
  Heading,
  Input,
  Flex,
  Button,
  Box,
} from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const formData = new FormData();
      formData.append("username", username.trim());
      formData.append("password", password.trim());

      const response = await axiosClient.post("/auth/access-token", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.status === 200) {
        const { access_token } = response.data;
        login(access_token);
        // navigate(from, { replace: true });
      }
    } catch (err) {
      // console.error("Error during API request:", err);
      setError(err.response?.statusText || "Login failed");
    }
  };

  return (
    <Box>
      <Flex mt={6} direction="column" minH="100vh" alignItems="center">
        <Heading color={"gray.400"}>Please login to continue</Heading>
        <Flex
          direction="column"
          alignItems="center"
          p={4}
          rounded="lg"
          boxShadow="sm"
          mx="auto"
        >
          {error && (
            <Text p={2} color="red.500">
              {error}
            </Text>
          )}
          <form onSubmit={handleLogin}>
            <Flex width="100%" gap={4} direction="column">
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="user@example.com"
                  type="email"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </FormControl>
            </Flex>
            <Button type="submit" mt={4} width="100%">
              Login
            </Button>
          </form>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Login;
