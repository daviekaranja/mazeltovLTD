import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import {
  Box,
  Text,
  Heading,
  Flex,
  InputGroup,
  InputRightAddon,
  Button,
  Input,
  Link,
  Divider,
  Icon,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box fontSize={"sm"} color={"gray.500"} bg={"gray.900"}>
      <Flex
        p={{ base: 2, md: 4 }}
        alignItems={"center"}
        justifyContent={"center"}
        gap={6}
        direction={{ base: "column", md: "row" }}
      >
        <Text maxW={{ base: "100%", md: "50%" }}>
          Subscribe to our Newsletter to be notified of our latest Products and
          Services
        </Text>

        <InputGroup flex={"1"}>
          <Input bg={"white"} type="email" placeholder="Enter Your Email" />
          <InputRightAddon>
            <Button>Subscribe</Button>
          </InputRightAddon>
        </InputGroup>
      </Flex>
      {/* this is the footer object */}
      <Flex
        justifyContent={"space-evenly"}
        gap={6}
        p={4}
        bg={"gray.800"}
        color={"gray.400"}
        direction={{ base: "column", md: "row" }}
      >
        <Box maxW={{ base: "100%", md: "25%" }}>
          <Text color={"gray.300"} fontSize={"md"} fontWeight={"bold"}>
            Mazeltov
          </Text>
          <Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe nisi
            molestias animi voluptatibus impedit
          </Text>
        </Box>
        <Flex direction={"column"}>
          <Text color={"gray.300"} fontSize={"md"} fontWeight={"bold"}>
            Links
          </Text>
          <Link>Home</Link>
          <Link>Services</Link>
          <Link>About</Link>
          <Link>Buy Airtime Online</Link>
          <Link display={["none", "flex"]} onClick={() => console.log("wait")}>
            Admin
          </Link>
        </Flex>
        <Box>
          <Text color={"gray.300"} fontSize={"md"} fontWeight={"bold"}>
            Products
          </Text>
          <Flex direction={"column"}>
            <Link>Airtel 4G Mifi</Link>
            <Link>Buy Airtime</Link>
          </Flex>
        </Box>
        <Box>
          <Text
            color={"gray.300"}
            fontWeight={"bold"}
            fontSize={"md"}
            textAlign={"center"}
          >
            Follow Us
          </Text>
          <Flex mt={2} gap={6} justifyContent={"center"}>
            <Link target="blank" href="https://web.facebook.com/mazeltov34">
              <Icon boxSize={6} as={FaFacebook} />
            </Link>
            <Link>
              <Icon boxSize={6} as={FaSquareInstagram} />
            </Link>
            <Link href="https://www.tiktok.com/@mazeltov2024?" target="blank">
              <Icon boxSize={6} as={AiFillTikTok} />
            </Link>
            <Link
              target="blank"
              href="https://wa.me/254784441637?text=Hello Mazeltov"
            >
              <Icon boxSize={6} as={IoLogoWhatsapp} />
            </Link>
          </Flex>
        </Box>
      </Flex>
      {/* <Divider /> */}
      <Flex
        bg={"gray.900"}
        direction={"row"}
        gap={6}
        p={{ base: 2, md: 4 }}
        justifyContent={"center"}
      >
        <Link>Terms and Conditions</Link>
        <Link>Privacy Policy</Link>
      </Flex>
    </Box>
  );
};

export default Footer;
