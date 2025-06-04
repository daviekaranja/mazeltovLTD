// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import MobileMenu from "../MobileMenu";

// const links = [
//   { label: "Home", to: "/" },
//   { label: "Products", to: "/deals" },
//   { label: "About", to: "/about" },
//   { label: "Support", to: "/support" },
// ];

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // Lock body scroll when mobile menu is open
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   return (
//     <nav className="fixed top-0 inset-x-0 z-50 bg-white backdrop-blur-lg shadow-lg border-b border-blue-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="h-16 flex items-center justify-between">
//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex items-center gap-2 text-xl font-bold text-blue-500 hover:text-blue-600 transition-colors select-none tracking-wide"
//           >
//             <span className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 flex items-center justify-center shadow-md">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                 <circle cx="12" cy="12" r="10" fill="#60A5FA" opacity=".18" />
//                 <path
//                   d="M8 15c1.333-2 6.667-2 8 0"
//                   stroke="#3B82F6"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                 />
//                 <circle cx="9" cy="10" r="1.2" fill="#3B82F6" />
//                 <circle cx="15" cy="10" r="1.2" fill="#3B82F6" />
//               </svg>
//             </span>
//             Mazeltov
//           </Link>

//           {/* Center Nav Links (desktop) */}
//           <ul className="hidden md:flex flex-1 justify-center items-center gap-10">
//             {links.map(({ label, to }) => (
//               <li key={label}>
//                 <Link
//                   to={to}
//                   className="relative  pb-2 text-base font-medium text-gray-600 hover:text-blue-500 transition
//                   after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full
//                   after:bg-gradient-to-r after:from-blue-300 after:to-blue-500 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
//                 >
//                   {label}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* Auth & Mobile Toggle */}
//           <div className="flex items-center gap-3">
//             {/* Desktop auth */}
//             <div className="hidden md:flex items-center gap-3">
//               <Link
//                 to="/login"
//                 className="text-gray-400 hover:text-blue-500 transition text-base font-medium"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 hover:from-blue-200 hover:to-blue-300 hover:text-blue-700 text-base font-semibold shadow transition"
//               >
//                 Sign Up
//               </Link>
//             </div>

//             {/* Insert the MobileMenu here */}
//             <MobileMenu
//               isOpen={isOpen}
//               onClose={() => setIsOpen(false)}
//               links={links}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Fullscreen Panel */}
//     </nav>
//   );
// };

// export default Navbar;

// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "../MobileMenu";

const links = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/deals" },
  { label: "About", to: "/about" },
  { label: "Support", to: "/support" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 bg-white backdrop-blur-lg shadow-lg border-b border-blue-100">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-blue-500 hover:text-blue-600 transition-colors select-none tracking-wide"
            >
              Mazeltov
            </Link>

            {/* Desktop-only nav links */}
            <ul className="hidden md:flex flex-1 justify-center items-center gap-10">
              {links.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-base font-medium text-gray-600 hover:text-blue-500 transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop-only auth buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 hover:from-blue-200 hover:to-blue-300 hover:text-blue-700 text-base font-semibold shadow transition"
              >
                Login
              </Link>
            </div>

            {/* Mobile menu toggle button (visible only on small screens) */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-100 transition"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <svg
                className="w-7 h-7 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Insert the MobileMenu here */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        links={links}
      />
    </>
  );
};

export default Navbar;
