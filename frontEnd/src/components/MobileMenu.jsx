import React, { useState, useEffect, useRef } from "react";
import {
  FiMenu,
  FiX,
  FiHome,
  FiInfo,
  FiBriefcase,
  FiMail,
  FiArrowRightCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click or ESC key
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden relative">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open mobile menu"
        className="text-white text-3xl p-2 hover:text-primary transition duration-300"
      >
        <FiMenu />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Mobile Menu Section */}
      {isOpen && (
        <section
          ref={menuRef}
          className={`fixed top-0 left-0 w-[80%] h-screen bg-white z-50 shadow-xl
                    flex flex-col py-8 px-6 space-y-8
                    transform transition-all duration-500 ease-in-out 
                    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close mobile menu"
            className="absolute top-4 right-4 text-3xl text-black hover:text-red-500 transition duration-300"
          >
            <FiX />
          </button>

          {/* Menu Links with Icons */}
          <nav className="space-y-6 text-lg font-medium">
            {[
              { icon: FiHome, label: "Home", link: "/" },
              { icon: FiInfo, label: "About Us", link: "/about" },
              { icon: FiBriefcase, label: "Services", link: "/services" },
              { icon: FiMail, label: "Contact", link: "/contact" },
            ].map(({ icon: Icon, label, link }, index) => (
              <Link
                key={index}
                to={link}
                className="flex items-center gap-4 text-gray-600 text-xl hover:text-primary transition duration-300"
              >
                <Icon className="text-primary text-2xl text-blue-500" />
                {label}
              </Link>
            ))}
            {/* <a
                key={index}
                href={link}
                className="flex items-center gap-4 text-gray-600 text-xl hover:text-primary transition duration-300"
              >
                <Icon className="text-primary text-2xl text-blue-500" />
                {label}
              </a>
            ))} */}
          </nav>

          {/* Call to Action Button */}
          <button
            className="mt-auto w-full flex items-center justify-center gap-3 py-3 bg-primary text-white font-semibold text-lg rounded-lg
                        hover:bg-accent transition duration-300"
          >
            Get Started <FiArrowRightCircle />
          </button>
        </section>
      )}
    </div>
  );
};

export default MobileMenu;
