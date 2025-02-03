import {
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { offers } from "../utils/utilities";
import { BingwaCard } from "./BingwaCard";

const OfferCards = () => {
  return (
    <Flex
      color={"gray.500"}
      bg={"gray.50"}
      direction="column"
      width={"100%"}
      alignItems={"center"}
      p={2}
    >
      <Box mt={2} pb={2}>
        <Heading textAlign={"center"} size={["md", "lg"]} color="green.500">
          Bingwa Sokoni Offers
        </Heading>
        <Text color={"green.500"}>
          Get unmatched deals, Data, Minutes, amd Sms
        </Text>
        <p className="text-sm text-center">
          {" "}
          You can buy for self or for another number
        </p>
      </Box>
      <Accordion allowMultiple defaultIndex={[0]} width={"100%"} px={[1, 2]}>
        {/* Data Offers Section */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Text fontWeight={"bold"} color="green.500">
                Data Offers
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <SimpleGrid columns={[1, 2, 4]} spacing={4}>
              {offers.data.map((offer, index) => (
                <Box flex={"1"} key={index}>
                  {/* <DealCard offerdata={offer} /> */}
                  <BingwaCard offerdata={offer} />
                </Box>
              ))}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>

        {/* SMS Section */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight={"bold"} color="green.500">
                  Sms Deals
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <SimpleGrid columns={[1, 2, 4]} spacing={4}>
              {offers.sms.map((offer, index) => (
                <Box key={index}>
                  <BingwaCard offerdata={offer} />
                </Box>
              ))}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight={"bold"} color="green.500">
                  Minutes Deals
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <SimpleGrid columns={[1, 2, 4]} spacing={6}>
              {offers.minutes.map((offer, index) => (
                <Box key={index}>
                  <BingwaCard offerdata={offer} />
                </Box>
              ))}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>

        {/* Minutes + Data Section */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight={"bold"} color={"green.500"}>
                  Minutes + Data Deals
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <SimpleGrid columns={[1, 2, 4]} spacing={6}>
              {offers.minutesPlusData.map((offer, index) => (
                <Box key={index}>
                  {/* <DealCard offerdata={offer} /> */}
                  <BingwaCard offerdata={offer} />
                </Box>
              ))}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default OfferCards;
