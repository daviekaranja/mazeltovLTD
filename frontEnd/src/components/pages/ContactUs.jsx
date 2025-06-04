import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [feedback, setFeedback] = useState(null);

  const onSubmit = async (data) => {
    setFeedback(null);
    await new Promise((r) => setTimeout(r, 1200));
    setFeedback("Thank you for contacting us! We'll get back to you soon.");
    reset();
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-brand-primary mb-2">
          Contact Us
        </h2>
        <p className="text-center text-gray-500 mb-6 text-base">
          Send us a message and we’ll get back to you soon.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" autoComplete="off">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register("name", { required: "Full name is required" })}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-brand-primary/60 bg-gray-50 transition ${
                errors.name ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="user@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-brand-primary/60 bg-gray-50 transition ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Your message..."
              {...register("message", { required: "Message is required" })}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-brand-primary/60 bg-gray-50 resize-none transition ${
                errors.message ? "border-red-400" : "border-gray-300"
              }`}
            ></textarea>
            {errors.message && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.message.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-brand-primary text-white font-semibold rounded-md shadow hover:bg-brand-primary-dark transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isSubmitting && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {feedback && (
            <div className="text-center mt-2">
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-md shadow-sm font-medium transition animate-fade-in">
                {feedback}
              </span>
            </div>
          )}
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-xs mb-2">
            Or reach us on social media:
          </p>
          <div className="flex justify-center gap-5">
            <a
              href="https://web.facebook.com/mazeltov34"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-primary transition"
              aria-label="Facebook"
            >
              <FaFacebook className="text-2xl" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-primary transition"
              aria-label="Instagram"
            >
              <FaSquareInstagram className="text-2xl" />
            </a>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-primary transition"
              aria-label="TikTok"
            >
              <AiFillTikTok className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-primary transition"
              aria-label="Twitter"
            >
              <FaXTwitter className="text-2xl" />
            </a>
          </div>
        </div>
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.5s;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ContactUs;
