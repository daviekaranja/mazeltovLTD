import React from "react";
import { useState } from "react";
import { Link } from "@chakra-ui/react";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";
import Navbar from "./v2/Navbar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const links = ["Home", "Products", "About", "Support"];
  const dest = ["/", "/deals", "/about", "/support"];
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Navbar section */}

      <Navbar />

      <main className="flex-1 mt-24 w-full">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
