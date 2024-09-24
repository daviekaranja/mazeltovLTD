import { Box, Text } from "@chakra-ui/react";
import React from "react";
import OfferCards from "../Offers";

const Sales = () => {
  return (
    <Box>
      <OfferCards />
      <Box p={1} bg={"white"}>
        <Text textAlign={"center"} color={"gray.500"} fontSize={["xs", "sm"]}>
          Please note you can only buy once in a day, once a deal is depleted
          you have to wait untill the next day
        </Text>
      </Box>
    </Box>
  );
};

export default Sales;
