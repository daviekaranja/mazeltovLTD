import React, { useEffect, useState } from "react";
import { BingwaCard } from "./BingwaCard";

// Tabs and types
const TABS = [
  { key: "data", label: "Data" },
  { key: "sms", label: "SMS" },
  { key: "minutes", label: "Minutes" },
  { key: "minutesPlusData", label: "Minutes + Data" },
];

const apiUrl = import.meta.env.VITE_BINGWA_URL;

// Offer type definition removed because interfaces are not supported in .jsx files.

const OfferCards = () => {
  const [activeTab, setActiveTab] = useState("data");
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error("Failed to fetch offers:", error);
      }
    };

    fetchOffers();
  }, []);

  const filteredOffers = offers.filter((offer) => offer.category === activeTab);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl mx-auto p-6 md:p-10 mb-8 text-center space-y-4 border border-green-100">
        <h1 className="text-green-700 font-extrabold text-2xl md:text-3xl tracking-tight">
          Bingwa Sokoni Offers
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Get unmatched deals on <span className="font-semibold text-green-600">Data</span>, <span className="font-semibold text-green-600">Minutes</span>, and <span className="font-semibold text-green-600">SMS</span>. Buy for yourself or another number.
        </p>

        {/* Tabs */}
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4 justify-center items-center py-2">
          {/* Mobile select */}
          <div className="w-full md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full p-3 border border-green-200 rounded-lg text-base text-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50"
            >
              {TABS.map((tab) => (
                <option key={tab.key} value={tab.key}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>
          {/* Desktop buttons */}
          <div className="hidden md:flex space-x-2">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-2 rounded-full text-base font-semibold transition-all duration-200 shadow-sm border ${
                  activeTab === tab.key
                    ? "bg-green-600 text-white border-green-600 scale-105"
                    : "bg-white text-green-700 border-green-200 hover:bg-green-100 hover:border-green-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl">
        {filteredOffers.length === 0 ? (
          <div className="flex justify-center items-center h-40 text-gray-400 text-lg">
            No offers available for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredOffers.map((offer) => (
              <BingwaCard
                key={offer.id}
                label={offer.label}
                validity={offer.validity}
                price={offer.price}
                offer_id={offer.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferCards;
