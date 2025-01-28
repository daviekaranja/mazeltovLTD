import { Link } from "react-router-dom";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axiosClient from "../api/axiosClient";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { div } from "framer-motion/client";

const BuyAirtime = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Amount is required")
      .min(5, "Amount must be at least 5")
      .max(2500, "Amount must be less than 2500"),
    phone_number: Yup.string()
      .matches(
        /^(07|01)\d{8}$/,
        "Phone number must start with 07 or 01 and be 10 digits"
      )
      .required("Phone number is required"),
    mpesa_number: Yup.string()
      .matches(
        /^(07|01)\d{8}$/,
        "Phone number must start with 07 or 01 and be 10 digits"
      )
      .required("Phone number is required"),
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="p-8 mx-auto bg-white text-gray-600 rounded-md border mb-8 border-gray-200 hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md w-full md:w-[400px] mt-4">
        <h3 className="text-2xl text-center font-bold mb-4">Buy Airtime</h3>
        <p className="text-left text-gray-500 mb-12">
          Buy airtime across all networks anytime. <br /> You can buy for any
          number
        </p>

        <Formik
          initialValues={{
            amount: "",
            phone_number: "",
            mpesa_number: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const strippedNumber = values.phone_number.replace(/^0/, ""); // Remove the leading 0
            const payload = {
              amount: values.amount,
              stkNumber: `254${strippedNumber}`,
            };
            setIsLoading(true);
            console.log(payload);
            try {
              const response = axiosClient.post(
                import.meta.env.VITE_PUSH_URL,
                payload
              );
              if (response.status === 200) {
                setIsLoading(false);
              }
              onClose(); // Close modal after submission
            } catch (error) {
              console.error("Error:", error);
            }
            const response = axiosClient.post(
              import.meta.env.VITE_PUSH_URL,
              payload
            );
            console.log(response);
            onClose(); // Close modal after submission
          }}
        >
          {({ handleSubmit }) => (
            <>
              <Form>
                {/* Amount Field */}
                <div className="mb-4">
                  <label
                    htmlFor="amount"
                    className="block text-gray-600 font-semibold mb-2"
                  >
                    Amount
                  </label>
                  <Field
                    type="number"
                    id="amount"
                    name="amount"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Phone Number Field */}
                <div className="mb-4">
                  <label
                    htmlFor="phone_number"
                    className="block text-gray-600 font-semibold mb-2"
                  >
                    Phone Number
                  </label>
                  <Field
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="phone_number"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Button to Open Modal */}
                <button
                  type="button"
                  onClick={onOpen}
                  className="w-full mb-8 bg-blue-600 font-bold text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Next
                </button>
              </Form>

              {/* Modal for M-Pesa Number */}
              <Modal size={"sm"} isOpen={isOpen} isCentered onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader className="text-2xl font-bold">
                    Enter M-Pesa Number
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {/* Mpesa Number Field */}
                    <label
                      htmlFor="mpesa_number"
                      className="block text-gray-600 font-semibold mb-2"
                    >
                      M-Pesa Number
                    </label>
                    <Field
                      type="tel"
                      id="mpesa_number"
                      name="mpesa_number"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="mpesa_number"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />

                    {/* spinner */}
                    {isLoading && (
                      <div className="flex justify-center mt-4">
                        <div className="loader">
                          <Spinner size="lg" />
                        </div>
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    {/* Updated Button to Trigger Formik Submission */}
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="w-full bg-green-600 font-bold text-white py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
                    >
                      Buy Airtime
                    </button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BuyAirtime;
