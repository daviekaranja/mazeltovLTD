import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-t from-slate-300 to-slate-100 text-slate-700 border-t border-slate-300">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center md:items-center justify-between gap-6">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-lg font-semibold mb-1 text-slate-800">
            Stay Updated
          </h2>
          <p className="text-slate-500 text-sm">
            Subscribe to our newsletter for updates.
          </p>
        </div>
        <form className="flex w-full max-w-md mx-auto md:mx-0 flex-col sm:flex-row gap-2 sm:gap-0">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-3 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none font-medium hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-300">
        {/* Company Info */}
        <div>
          <h3 className="text-base font-bold text-slate-800 mb-1">Mazeltov</h3>
          <p className="text-slate-500 text-xs">
            Mazeltov Commercial Agencies is a Kenyan-based company committed to
            providing reliable and trustworthy services across a variety of
            industries.
          </p>
        </div>
        {/* Links */}
        <div>
          <h3 className="text-base font-bold text-slate-800 mb-1">Links</h3>
          <ul className="space-y-1 text-slate-600 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-blue-600 transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/buy-airtime"
                className="hover:text-blue-600 transition"
              >
                Buy Airtime Online
              </Link>
            </li>
            <li>
              <span
                onClick={() => navigate("/manage")}
                className="hover:text-blue-600 transition cursor-pointer hidden md:inline"
              >
                Admin
              </span>
            </li>
          </ul>
        </div>
        {/* Products */}
        <div>
          <h3 className="text-base font-bold text-slate-800 mb-1">Products</h3>
          <ul className="space-y-1 text-slate-600 text-sm">
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                Airtel 4G Mifi
              </a>
            </li>
            <li>
              <a href="/buy-airtime" className="hover:text-blue-600 transition">
                Buy Airtime
              </a>
            </li>
          </ul>
        </div>
        {/* Social */}
        <div>
          <h3 className="text-base font-bold text-slate-800 mb-1">Follow Us</h3>
          <div className="flex gap-3 mt-1">
            <a
              href="https://web.facebook.com/mazeltov34"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-slate-500 hover:text-blue-600 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-xl text-slate-500 hover:text-pink-500 transition"
            >
              <FaSquareInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@mazeltov2024?"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-slate-500 hover:text-black transition"
            >
              <AiFillTikTok />
            </a>
            <a
              href="https://wa.me/254784441637?text=Hello Mazeltov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-slate-500 hover:text-green-500 transition"
            >
              <IoLogoWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2 border-t border-slate-300 text-xs text-slate-500 text-center md:text-left">
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
          <a
            href="/legal/data-policies"
            className="hover:text-blue-600 transition"
          >
            Terms & Conditions
          </a>
          <a
            href="/legal/data-policies"
            className="hover:text-blue-600 transition"
          >
            Privacy Policy
          </a>
        </div>
        <div>
          &copy; {new Date().getFullYear()} Mazeltov. All rights reserved.
        </div>
        <div className="hidden md:block">Version: 1.2.5</div>
      </div>
    </footer>
  );
};

export default Footer;
