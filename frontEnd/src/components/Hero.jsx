import React from "react";
import { Box, Text, Heading, Flex, Button, Link } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Flex>
      <Flex
        justify={"center"}
        direction={"column"}
        p={{ base: 2, md: 4, lg: 8 }}
        bgImage={"https://imgur.com/RKilqDM.jpg"}
        h={{ base: "350px", md: "400px" }} // Ensure height constraints
        w={"100%"}
        bgSize={"cover"}
        bgPosition={"center"}
        position={"relative"}
        overflow={"hidden"} // Hide any overflow content
      >
        {/* Overlay Box */}
        <Box
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgColor={"rgba(0, 0, 0, 0.25)"} // Black with 50% opacity
          zIndex={1} // Ensure the overlay is above the background image
        />

        <Flex
          justify={"center"}
          direction={"column"}
          zIndex={2}
          p={4}
          color={"white"}
        >
          <Heading fontWeight={"bold"} color={"white"}>
            Shika AirtIme Chap Chap
          </Heading>
          <Box width={{ base: "100%", md: "75%", lg: "50%" }}>
            <Text fontSize={{ base: "md", md: "lg" }} mt={2} color={"white"}>
              Buy Airtime across all networks in Kenya using our Paybil 450 99
              08
            </Text>
          </Box>
        </Flex>
      </Flex>

      {/* <Flex
        justifyContent={{ base: "space-between", md: "center" }}
        alignItems={"center"}
        gap={2}
        display={"flex"}
        p={2}
        color={"gray.900"}
        bg={"yellow"}
      >
        <Text fontSize={{ base: "md", md: "lg" }} as={"p"}>
          You Can also buy airtime online
        </Text>
        <Button color={"white"} bg={"brand.primary"}>
          Buy Now
        </Button>
      </Flex> */}
    </Flex>
  );
};

export default Hero;
