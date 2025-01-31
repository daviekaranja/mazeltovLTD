import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";

const ContactForm = () => {
  return (
    <div className="px-4 py-8 mx-auto max-w-3xl bg-slate-50">
      <h2 className="text-3xl font-bold text-center text-gray-900">
        Get In Touch
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Send us an Email, and we will get back to you as soon as possible.
      </p>

      <div className="mt-4 p-4 space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-gray-700 font-semibold">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-gray-700 font-semibold">
            Email
          </label>
          <small className="text-gray-500">
            We will reach you at this email.
          </small>
          <input
            id="email"
            type="email"
            placeholder="user@example.com"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-gray-700 font-semibold"
          >
            Your Message
          </label>
          <textarea
            id="message"
            placeholder="Your message..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/2 py-3 bg-brand-primary bg-blue-500 text-white font-bold rounded-md hover:bg-brand-primary-dark transition-all duration-300"
          >
            Send Message
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          You can also reach us through our social media pages.
        </p>
        <div className="mt-6 space-x-6 flex justify-center">
          <a
            href="https://web.facebook.com/mazeltov34"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-brand-primary transition-colors duration-300"
          >
            <FaFacebook className="text-3xl" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-brand-primary transition-colors duration-300"
          >
            <FaSquareInstagram className="text-3xl" />
          </a>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-brand-primary transition-colors duration-300"
          >
            <AiFillTikTok className="text-3xl" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-brand-primary transition-colors duration-300"
          >
            <FaXTwitter className="text-3xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
