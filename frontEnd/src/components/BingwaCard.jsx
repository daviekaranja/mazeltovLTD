import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Spinner } from "@chakra-ui/react";

export const BingwaCard = ({ offerdata }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleButtonClick = () => {
    setShowInputs(true);
  };

  const validationSchema = Yup.object({
    payingNumber: Yup.string()
      .matches(/^(07|01)\d{8}$/, "Invalid number, must start with 07 or 01")
      .required("Paying number is required"),
    receivingNumber: Yup.string()
      .matches(
        /^(07|01)\d{8}$/,
        "Invalid number, must start with 07 or 01 number"
      )
      .required("Receiving number is required"),
  });

  const handleSubmit = async (values) => {
    const payload = new URLSearchParams({
      paying_number: values.payingNumber,
      receiving_number: values.receivingNumber,
      amount: offerdata.price,
      username: "mazeltov",
      productID: offerdata.productID,
    });

    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const isProduction = process.env.NODE_ENV === "production";

      const response = await fetch(
        isProduction
          ? import.meta.env.VITE_PROXY_URL
          : "http://127.0.0.1:8000/api/v1/proxy/bingwa-proxy",
        {
          method: "POST",
          headers: {
            "X-API-KEY": import.meta.env.VITE_API_KEY,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: payload,
        }
      );

      const data = await response.json(); // Extract JSON from response

      console.log("Full Response:", data); // Debugging

      if (Number(String(data.code).trim()) === 706) {
        setSuccessMessage(
          "Request successful, Enter Mpesa pin to confirm Payment."
        );
      } else {
        setErrorMessage(`Request failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Request Error:", error);
      setErrorMessage("Request failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowInputs(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <div className="w-full bg-white mx-auto p-4 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all ease-in-out duration-300">
      <div className="text-center mb-4">
        <img
          className="h-12 mx-auto"
          src="https://i.postimg.cc/J02wFgLV/SAF-MAIN-LOGO.png"
          alt="Logo"
        />
      </div>
      <div className="text-center">
        <p className="text-green-600 font-semibold text-lg">
          {offerdata.label} @ {offerdata.price}
        </p>

        {!showInputs && (
          <div className="mt-4 p-4">
            <button
              onClick={handleButtonClick}
              className="px-4 py-2 text-xl bg-green-600 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200"
            >
              Get Now
            </button>
          </div>
        )}

        {showInputs && (
          <Formik
            initialValues={{ payingNumber: "", receivingNumber: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange
            validateOnBlur
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <div className="space-y-4 mt-4 text-xl">
                  <div>
                    <label className="block text-gray-600 text-sm font-semibold">
                      Enter Your Paying Number
                    </label>
                    <Field
                      name="payingNumber"
                      type="text"
                      placeholder="0700 000 000"
                      disabled={isLoading} // Disable input when loading
                      className="w-full p-2 border-b border-gray-300  mt-1 focus:outline-none"
                    />
                    <ErrorMessage
                      name="payingNumber"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 text-sm font-semibold">
                      Enter Your Receiving Number
                    </label>
                    <Field
                      name="receivingNumber"
                      type="text"
                      placeholder="0700 000 000"
                      disabled={isLoading} // Disable input when loading
                      className="w-full p-2 border-b border-gray-300  mt-1 focus:outline-none "
                    />
                    <ErrorMessage
                      name="receivingNumber"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="flex gap-4 text-xl">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="w-full py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      className={`w-full py-2 text-white rounded-md ${
                        isSubmitting || !isValid
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      } transition duration-300`}
                    >
                      {isLoading ? <Spinner /> : "Buy Now"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}

        {successMessage && (
          <div className="text-green-500 text-sm mt-4 text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-red-500 text-sm mt-4 text-center">
            {errorMessage}
          </div>
        )}

        <p className="text-center text-xs text-gray-500 mt-4">
          Terms and conditions apply
        </p>
      </div>
    </div>
  );
};

const InputField = ({ name, label, placeholder, disabled }) => (
  <div>
    <label className="block text-gray-600 text-sm font-semibold">{label}</label>
    <Field
      name={name}
      type="text"
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
      disabled={disabled}
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-xs mt-1"
    />
  </div>
);
