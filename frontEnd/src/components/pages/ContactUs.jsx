import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";

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
  Icon,
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
        <Flex mt={4} gap={4} justifyContent={"center"}>
          <Link target="blank" href="https://web.facebook.com/mazeltov34">
            <Icon boxSize={6} as={FaFacebook} />
          </Link>
          <Link>
            <Icon boxSize={6} as={FaSquareInstagram} />
          </Link>
          <Link>
            <Icon boxSize={6} as={AiFillTikTok} />
          </Link>
          <Link>
            <Icon boxSize={6} as={FaXTwitter} />
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default ContactForm;
