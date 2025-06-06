import React from "react";
import { Helmet } from "react-helmet";
import OfferCards from "../Offers";

const Sales = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
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
        <meta property="og:image" content="URL_TO_IMAGE" />
        <meta property="og:url" content="https://mazeltov.co.ke" />
      </Helmet>
      <div className="w-full mx-auto px-4">
        <OfferCards />
      </div>
    </div>
  );
};

export default Sales;
