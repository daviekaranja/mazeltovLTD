import React from "react";
import { InputField } from "../utils/UiComponents";
import { Box, Text, Heading, Button } from "@chakra-ui/react";

const ResetPassword = () => {
  return (
    <Box
      boxShadow={"sm"}
      mt={2}
      p={4}
      mx={"auto"}
      maxW={["100%", 600]}
      bg={"white"}
      rounded={"md"}
    >
      <Heading size={"md"}>Reset Password</Heading>
      <Text mb={2}>Enter your email address</Text>
      <InputField
        label={"Email"}
        type="email"
        name={"email"}
        value={""}
        onChange={console.log("Done")}
        onBlur={""}
        size={["sm", "md"]}
      />

      <Box
        mt={2}
        display="flex"
        flexDirection={"row"}
        justifyContent={"center"}
      >
        <Button size={["sm", "md"]} mt={2} colorScheme="teal">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
