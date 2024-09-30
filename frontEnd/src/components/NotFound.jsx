import React from "react";
import { Box, Flex, Heading, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <Flex
      p={4}
      gap={6}
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
      mt={2}
      color={"white"}
      bg={"brand.primary"}
      height={"40vh"} // Ensure it takes full screen height
      textAlign={"center"}
    >
      <Heading>Oops, Nothing Here</Heading>
      <Text>We can't seem to find the page you're looking for.</Text>
      <Text>
        Try going back to the previous page or contact us for more information.
      </Text>
      <Button m={4} width={"50%"} onClick={handleGoBack}>
        Go Back
      </Button>
    </Flex>
  );
};

export default NotFound;
