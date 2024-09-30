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
import { DealCard } from "../utils/UiComponents";
import { handleInputChange } from "../utils/utilities";

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
      <Accordion allowMultiple defaultIndex={[0]} width={"100%"} px={2}>
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
            <SimpleGrid columns={[1, 2, 4]} spacing={2}>
              {offers.data.map((offer, index) => (
                <Box key={index}>
                  <DealCard offerdata={offer} />
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
            <SimpleGrid columns={[1, 2, 4]} spacing={6}>
              {offers.sms.map((offer, index) => (
                <Box key={index}>
                  <DealCard offerdata={offer} />
                </Box>
              ))}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>

        {/* Minutes Section */}
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
                  <DealCard offerdata={offer} />
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
                  <DealCard offerdata={offer} />
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
