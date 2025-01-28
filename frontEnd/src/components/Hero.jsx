import React from "react";

const Hero = () => {
  return (
    <div className="flex justify-center flex-col items-center relative w-full h-[350px] md:h-[400px] bg-cover bg-center bg-[url('https://i.postimg.cc/QtwqDPcg/team.jpg')] overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-25 z-10"></div>

      {/* Content */}
      <div className="relative z-20 md:text-center px-4 md:px-8 text-white">
        <h1 className="text-3xl md:text-5xl font-bold">
          Shika AirtIme Chap Chap
        </h1>
        <p className="mt-2 text-lg md:text-xl max-w-md mx-auto">
          Buy Airtime across all networks in Kenya using our Paybill{" "}
          <strong>450 99 08</strong>
        </p>
      </div>
    </div>
  );
};

export default Hero;
