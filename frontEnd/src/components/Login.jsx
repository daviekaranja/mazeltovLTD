import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import axiosClient from "../api/axiosClient";
import {
  FormControl,
  FormLabel,
  Text,
  Heading,
  HStack,
  Input,
  Flex,
  Button,
  Box,
  StackDivider,
  Link,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

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
    <Box mt={4} h={"100vh"}>
      {/* main box */}
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        p={4}
        h={400}
        rounded={"lg"}
        width={"70%"}
        mx={"auto"}
        mt={4}
        bg={"white"}
        border={"1px"}
        borderColor={"gray.200"}
      >
        <HStack
          w={"100%"}
          h={"100%"}
          justifyContent={"center"}
          p={2}
          // divider={<StackDivider borderColor={"gray.200"} />}
        >
          <Box p={2} maxW={"50%"}>
            <Heading size={"lg"} mt={1}>
              Mazeltov Commercial <br /> Agencies
            </Heading>
            <Text mt={2}>Please Log in to continue</Text>
          </Box>
          <Box flex={"1"}>
            <Flex // input box
              bg={"white"}
              direction="column"
              alignItems="center"
              rounded="lg"
              mx="auto"
            >
              {error && (
                <Text p={2} color="red.500">
                  {error}
                </Text>
              )}
              <form onSubmit={handleLogin}>
                <Flex width="100%" gap={4} direction="column">
                  <FormControl bg={"white"} isRequired>
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
                    <InputGroup size={"md"}>
                      <Input
                        bg="white" // Set background color to white
                        focusBorderColor="white"
                        bg={"white"}
                        type={show ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputRightElement pr={2}>
                        <Button size="sm" onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </Flex>
                <Flex width={"100%"} justifyContent={"center"} p={2}>
                  <Button
                    type="submit"
                    size={"md"}
                    mt={4}
                    colorScheme="blue"
                    bg={"brand.primary"}
                  >
                    Login
                  </Button>
                </Flex>
                <Flex mt={2} justifyContent={"space-between"} direction={"row"}>
                  <Link fontSize={"xs"} color={"brand.primary"}>
                    create account?
                  </Link>
                  <Link fontSize={"xs"} color={"brand.primary"}>
                    forgot password?
                  </Link>
                </Flex>
              </form>
            </Flex>
          </Box>
        </HStack>
        <Text color={"gray.400"} fontSize={"xs"}>
          By using our services you agree to our{" "}
          <Link fontSize={"xs"} color={"brand.primary"}>
            Terms and Conditions
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
