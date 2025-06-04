import React, { useState } from "react";
import { useForm } from "react-hook-form";

const stkPushUrl: string = import.meta.env.VITE_STK_PUSH_URL;

type OfferCardProps = {
  label: string;
  price: number;
  validity: string;
  offer_id: number;
};

type OfferFormInputs = {
  payingNumber: string;
  receivingNumber: string;
};

export const BingwaCard: React.FC<OfferCardProps> = ({
  label,
  price,
  validity,
  offer_id,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OfferFormInputs>();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: OfferFormInputs) => {
    const payload = {
      paying_number: data.payingNumber,
      receiving_number: data.receivingNumber,
      amount: price,
      offer_id: offer_id,
    };

    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch(stkPushUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.detail || "Something went wrong. Try again.");
        return;
      }

      setSuccessMessage("STK push sent successfully! Check your phone.");
    } catch {
      setErrorMessage("An error occurred. Please try again later.");
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 5000);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col gap-6 transition-shadow hover:shadow-xl">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
            {validity}
          </span>
        </div>
        <div className="flex items-end gap-1 mt-2">
          <span className="text-3xl font-bold text-green-600">Ksh {price}</span>
          <span className="text-gray-400 text-base">.00</span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        autoComplete="off"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700 font-medium">
            Paying Number
          </label>
          <input
            type="text"
            {...register("payingNumber", {
              required: "Paying number is required",
              pattern: {
                value: /^(07|01)\d{8}$/,
                message: "Enter a valid Safaricom number",
              },
            })}
            placeholder="e.g. 0712345678"
            className={`w-full px-3 py-2 rounded-lg border text-base transition focus:ring-2 focus:ring-green-200 outline-none ${
              errors.payingNumber
                ? "border-red-400 focus:ring-red-100"
                : "border-gray-200 focus:border-green-400"
            }`}
          />
          {errors.payingNumber && (
            <span className="text-xs text-red-500">
              {errors.payingNumber.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700 font-medium">
            Receiving Number
          </label>
          <input
            type="text"
            {...register("receivingNumber", {
              required: "Receiving number is required",
              pattern: {
                value: /^(07|01)\d{8}$/,
                message: "Enter a valid Safaricom number",
              },
            })}
            placeholder="e.g. 0712345678"
            className={`w-full px-3 py-2 rounded-lg border text-base transition focus:ring-2 focus:ring-green-200 outline-none ${
              errors.receivingNumber
                ? "border-red-400 focus:ring-red-100"
                : "border-gray-200 focus:border-green-400"
            }`}
          />
          {errors.receivingNumber && (
            <span className="text-xs text-red-500">
              {errors.receivingNumber.message}
            </span>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg shadow hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Buy Now"}
        </button>
      </form>

      {(successMessage || errorMessage) && (
        <div
          className={`w-full text-center py-2 rounded-lg text-sm font-medium transition ${
            successMessage
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {successMessage || errorMessage}
        </div>
      )}
    </div>
  );
};
