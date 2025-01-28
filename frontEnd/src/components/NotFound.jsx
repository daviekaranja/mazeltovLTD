import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-3xl flex flex-col text-gray-600 space-y-6 p-8 justify-center items-center">
      <h1 className="text-9xl text-blue-500 mb-4">404</h1>
      <h1 className="text-xl text-center mb-4">
        The page you are looking for seems not to exist or an error occorred
      </h1>

      <div className="w-full flex justify-center items-center mb-4">
        <Link
          to={"/"}
          className="w-full text-center md:w-[200px] rounded-md bg-blue-500 text-white p-4 h-full"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
