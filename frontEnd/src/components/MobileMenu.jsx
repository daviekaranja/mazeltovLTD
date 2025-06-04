// MobileMenu.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const MobileMenu = ({ isOpen, onClose, links }) => {
  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" />

      {/* Sliding Panel */}
      <aside
        className={`absolute top-0 right-0 h-full w-full max-w-xs sm:max-w-sm bg-slate-50 dark:bg-slate-900 shadow-2xl rounded-l-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800">
          <span className="text-xl font-bold text-blue-600 tracking-wide select-none">
            Menu
          </span>
          <button
            className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-800 transition"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6 text-blue-500 dark:text-blue-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="flex flex-col gap-4">
            {links.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  onClick={onClose}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-300 transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="px-6 pb-6 flex flex-col gap-3">
          <Link
            to="/login"
            onClick={onClose}
            className="w-full text-center px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 font-semibold shadow-lg transition"
          >
            Login
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default MobileMenu;
