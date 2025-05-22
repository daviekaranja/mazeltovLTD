import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { i } from "framer-motion/client";
import { Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="text-sm text-gray-500 bg-gray-900">
      {/* Newsletter Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4">
        <p className="max-w-full md:max-w-1/2 text-center md:text-left">
          Subscribe to our Newsletter to be notified of our latest Products and
          Services
        </p>
        <div className="flex flex-1">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="bg-white px-4 py-2 w-full rounded-l-md focus:outline-none"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="flex flex-col md:flex-row justify-between gap-6 p-4 bg-gray-800 text-gray-400">
        <div className="w-[300px]">
          <h3 className="text-gray-300 font-bold text-md">Mazeltov</h3>
          <p className="line-clamp-4">
            Mazeltov Commercial Agencies is a Kenyan-based company committed to
            providing reliable and trustworthy services across a variety of
            industries. With a focus on quality, integrity, and customer
            satisfaction, Mazeltov strives to connect consumers with genuine
            products and services, ensuring a smooth and secure purchasing
            experience.
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-gray-300 font-bold text-md">Links</h3>
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <Link to="/services" className="hover:text-white">
            Services
          </Link>
          <Link to="/about" className="hover:text-white">
            About
          </Link>
          <Link to="/contact" className="hover:text-white">
            Contact
          </Link>
          <Link to="/buy-airtime" className="hover:text-white">
            Buy Airtime Online
          </Link>

          <a
            onClick={() => navigate("/manage")}
            className="hover:text-white cursor-pointer hidden md:flex"
          >
            Admin
          </a>
        </div>

        <div>
          <h3 className="text-gray-300 font-bold text-md">Products</h3>
          <div className="flex flex-col">
            <a href="#" className="hover:text-white">
              Airtel 4G Mifi
            </a>
            <a href="/buy-airtime" className="hover:text-white">
              Buy Airtime
            </a>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-gray-300 font-bold text-md">Follow Us</h3>
          <div className="flex justify-center gap-6 mt-2">
            <a
              href="https://web.facebook.com/mazeltov34"
              target="_blank"
              className="text-xl text-gray-400 hover:text-white"
            >
              <FaFacebook />
            </a>
            <a href="#" className="text-xl text-gray-400 hover:text-white">
              <FaSquareInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@mazeltov2024?"
              target="_blank"
              className="text-xl text-gray-400 hover:text-white"
            >
              <AiFillTikTok />
            </a>
            <a
              href="https://wa.me/254784441637?text=Hello Mazeltov"
              target="_blank"
              className="text-xl text-gray-400 hover:text-white"
            >
              <IoLogoWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-900 flex flex-col md:flex-row gap-6 p-4 justify-center text-center">
        <a href="/legal/data-policies" className="hover:text-white">
          Terms and Conditions
        </a>
        <a href="/legal/data-policies" className="hover:text-white">
          Privacy Policy
        </a>
        <p>&copy; {new Date().getFullYear()} Mazeltov. All rights reserved</p>

        {/* version */}
        <p className="hidden md:flex">
          Version: 1.2.4
        </p>
      </div>
    </div>
  );
};

export default Footer;
