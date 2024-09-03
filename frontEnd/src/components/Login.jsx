import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username.trim());
      formData.append("password", password.trim());

      const response = await axiosClient.post("/auth/access-token", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        const { access_token } = response.data;
        if (access_token) {
          login(access_token); // Update auth state
          localStorage.setItem("authToken", access_token); // Store access token in localStorage
          navigate(from, { replace: true });
        }
      }
    } catch (err) {
      if (err.response) {
        console.error("Response Error:", err.response);
        setError(err.response.data?.message || "Login failed");
      } else if (err.request) {
        console.error("Request Error:", err.request);
        setError("No response from server");
      } else {
        console.error("Error Message:", err.message);
        setError("An error occurred");
      }
    }
  };

  return (
    <Flex m={6} direction={"column"} alignItems={"center"}>
      <Flex
        direction={"column"}
        alignItems={"center"}
        padding={4}
        rounded={"lg"}
        minW={400}
        border={"1px"}
        borderColor={"gray.300"}
        boxShadow={"sm"}
        mx={"auto"}
      >
        <Heading>Login</Heading>
        <Text padding={2} color={"red"}>
          {error}
        </Text>
        <Flex width={"100%"} gap={4} direction={"column"}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
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
        <Button onClick={handleLogin} type="button" mt={4}>
          Login
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
