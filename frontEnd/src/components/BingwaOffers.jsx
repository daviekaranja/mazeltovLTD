import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const BuyAirtime = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Validation schema using Yup
  const validationSchema = Yup.object({
    paying_number: Yup.string()
      .required("Paying number is required")
      .matches(
        /^254\d{9}$/,
        "Must be a valid Kenyan number (12 digits, starting with 254)"
      ),
    receiving_number: Yup.string()
      .required("Receiving number is required")
      .matches(
        /^254\d{9}$/,
        "Must be a valid Kenyan number (12 digits, starting with 254)"
      ),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be greater than 0"),
    username: Yup.string()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters"),
    productID: Yup.string()
      .required("Product ID is required")
      .matches(/^P\d{5}$/, "Product ID must be in the format P12345"),
  });

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        "https://www.bingwastore.co.ke/api/data/form.php",
        {
          method: "POST",
          headers: {
            "X-API-KEY": "Hf3GDsIb4xLHUDVfpSPaSHKjYCIxDA0O",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(values).toString(),
        }
      );

      if (!response.ok) throw new Error("Failed to purchase airtime");

      setSuccessMessage("Airtime successfully purchased!");
      resetForm();
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Buy Airtime</h1>
        <Formik
          initialValues={{
            paying_number: "",
            receiving_number: "",
            amount: "",
            username: "",
            productID: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              {/* Paying Number */}
              <div className="mb-4">
                <label
                  htmlFor="paying_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Paying Number
                </label>
                <Field
                  type="text"
                  id="paying_number"
                  name="paying_number"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="paying_number"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Receiving Number */}
              <div className="mb-4">
                <label
                  htmlFor="receiving_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Receiving Number
                </label>
                <Field
                  type="text"
                  id="receiving_number"
                  name="receiving_number"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="receiving_number"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Amount */}
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount (KES)
                </label>
                <Field
                  type="number"
                  id="amount"
                  name="amount"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Username */}
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Product ID */}
              <div className="mb-6">
                <label
                  htmlFor="productID"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product ID
                </label>
                <Field
                  type="text"
                  id="productID"
                  name="productID"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="productID"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? "Processing..." : "Buy Airtime"}
              </button>

              {/* Success and Error Messages */}
              {successMessage && (
                <div className="mt-4 text-green-600 text-center">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="mt-4 text-red-500 text-center">
                  {errorMessage}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BuyAirtime;
