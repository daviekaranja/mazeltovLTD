import { Box, Text, Heading } from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet";
import OfferCards from "../Offers";

const Sales = () => {
  return (
    <Box>
      <Helmet>
        <title>Mazeltov - Bingwa Sokoni Deals - SMS & Minutes Offers</title>
        <meta
          name="description"
          content="Browse the latest Bingwa Sokoni deals on SMS and minutes. Get the best offers available today and save on your mobile expenses!"
        />
        <meta
          name="keywords"
          content="Bingwa Sokoni, SMS deals, mobile minutes offers, Kenya mobile deals, buy SMS deals, best mobile offers"
        />
        <meta
          property="og:title"
          content="Bingwa Sokoni Deals - SMS & Minutes Offers"
        />
        <meta
          property="og:description"
          content="Find the best deals for SMS and minutes on Bingwa Sokoni. Get incredible savings today with our exclusive offers!"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="URL_TO_IMAGE" // Add an image URL for social media previews
        />
        <meta
          property="og:url"
          content="https://mazeltov.co.ke" // Replace with your actual URL
        />
      </Helmet>
      <OfferCards />
      <Box p={1} bg={"white"}>
        <Text textAlign={"center"} color={"gray.500"} fontSize={["xs", "sm"]}>
          Please note you can only buy once in a day, once a deal is depleted
          you have to wait until the next day
        </Text>
      </Box>
    </Box>
  );
};

export default Sales;
