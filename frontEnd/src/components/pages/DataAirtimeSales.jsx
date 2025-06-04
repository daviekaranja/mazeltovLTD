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
        <div className="flex items-start bg-blue-50 border-l-4 border-blue-400 text-blue-800 px-4 py-4 mt-10 rounded-md shadow-sm">
          <svg
            className="w-6 h-6 mr-3 flex-shrink-0 text-blue-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10A8 8 0 112 10a8 8 0 0116 0zm-8 4a1 1 0 100-2 1 1 0 000 2zm.75-7.75a.75.75 0 00-1.5 0v4a.75.75 0 001.5 0v-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm">
            Please note you can only buy once per day. Once a deal is depleted,
            you have to wait until the next day.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sales;
