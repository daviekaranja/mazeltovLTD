import React from "react";

import {
  Box,
  Text,
  Heading,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea,
  Button,
  Link,
} from "@chakra-ui/react";

const ContactForm = () => {
  return (
    <Box
      p={4}
      fontSize={{ base: "md", md: "lg" }}
      mx={"auto"}
      mt={2}
      maxW={800}
    >
      <Heading>Get In Touch</Heading>
      <Text>
        Send us an Email and we will get back to you as soon as possible
      </Text>
      <Flex mt={4} p={2} gap={4} direction={"column"}>
        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input placeholder="John Doe" type="text" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <FormHelperText>We will reach you this email</FormHelperText>
          <Input placeholder="user@example.com" type="email" />
        </FormControl>

        <FormControl isRequired>
          <Textarea placeholder="Your Message" />
        </FormControl>
        <Button mx={"auto"} w={"50%"} color={"white"} bg={"brand.primary"}>
          Send Message
        </Button>
      </Flex>
      <Box mt={4}>
        <Text textAlign={"center"} fontSize={"sm"}>
          You can also reach us through our social media pages
        </Text>
        <Flex mt={2} justifyContent={"center"} gap={2}>
          <Link>Facebook</Link>
          <Link>WhatsApp</Link>
          <Link>Instagram</Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default ContactForm;
