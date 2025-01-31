import React from "react";
import { useState } from "react";
import { Link } from "@chakra-ui/react";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const links = ["Home", "Products", "About", "Support"];
  const dest = ["/", "/deals", "/about", "/support"];
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* navbar section */}

      <nav className="h-20 bg-blue-500 text-white fixed w-full z-50 mb-20 flex flex-row p-4 justify-between items-center">
        <div className="">
          <Link className="text-2xl " href="/">
            Mazeltov
          </Link>
        </div>
        {/* links */}
        <div className="hidden md:flex items-center ">
          <ul className="flex gap-4 lg:gap-12">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-xl text-decoration-none hover:{{
                  underline: none,
                  color: blue-300}} text-white"
                  href={dest[index]}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </nav>

      {/* main content section */}
      <main className="flex-1 mt-20 w-full">{children}</main>

      {/* footer section */}
      <Footer />
    </div>
  );
};
export default Layout;
