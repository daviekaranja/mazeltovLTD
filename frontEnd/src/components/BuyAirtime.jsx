// import React, { useState } from "react";
// import { PayBillPush } from "../schemas/schemas"; // Ensure your Zod schema is correctly imported
// import axiosClient from "../api/axiosClient";
// import {
//   Box,
//   Text,
//   Flex,
//   FormControl,
//   Input,
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Stack,
//   Radio,
//   RadioGroup,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
// } from "@chakra-ui/react";

// // Function to convert local phone number to international format
// const formatStkNumber = (phone) => {
//   // Convert from local to international format if needed
//   if (/^07\d{8}$/.test(phone) || /^01\d{8}$/.test(phone)) {
//     return `254${phone.slice(1)}`;
//   }
//   // Return as-is if it's already formatted
//   return phone;
// };

// // Function to validate recharge number format (local 07/01 format)
// const validateRechargeNumber = (phone) => {
//   return /^07\d{8}$/.test(phone) || /^01\d{8}$/.test(phone);
// };

// const BuyAirtime = () => {
//   const [recipient, setRecipient] = useState("self"); // Determines if user buys for 'self' or 'other'
//   const [data, setData] = useState({
//     rechargeNumber: "", // Filled either by stkNumber (self) or entered number (other)
//     amount: "",
//   });

//   const [mpesaNumber, setMpesaNumber] = useState(""); // Holds the stkNumber (entered in modal)

//   const { isOpen, onOpen, onClose } = useDisclosure();

//   // Input change handler for amount and the phone number if 'Other' is selected
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handles the mpesa number input change inside the modal
//   const handleMpesaInputChange = (e) => {
//     setMpesaNumber(e.target.value);
//   };

//   const handleSubmitMpesaNumber = async () => {
//     // Assign the value of stkNumber to rechargeNumber based on recipient
//     const rechargeNumber =
//       recipient === "self" ? mpesaNumber : data.rechargeNumber;

//     // Convert stkNumber to international format
//     const formattedStkNumber = formatStkNumber(mpesaNumber);

//     // Validate and format rechargeNumber if necessary
//     let formattedRechargeNumber = rechargeNumber;
//     if (recipient === "self") {
//       // If self, rechargeNumber should be the same as stkNumber in international format
//       formattedRechargeNumber = formattedStkNumber;
//     } else {
//       // If other, ensure rechargeNumber is in the correct local format
//       if (!validateRechargeNumber(rechargeNumber)) {
//         console.error("Invalid recharge number format");
//         return;
//       }
//     }

//     // Construct the payload with formatted numbers and amount as a number
//     const payload = {
//       rechargeNumber: formattedRechargeNumber,
//       stkNumber: formattedStkNumber,
//       amount: Number(data.amount),
//     };

//     console.log("Payload before validation:", payload);

//     try {
//       // Validate using PayBillPush schema
//       const sanitized = PayBillPush.parse(payload);
//       console.log("Sanitized Data:", sanitized);

//       // Proceed with sending the STK push via API call if validation is successful
//       const response = await axios.post(
//         "/api/v1/payments/paybill-push",
//         sanitized
//       );
//       console.log("STK Push Response: ", response.data);

//       onClose(); // Close modal after successful validation and API call
//     } catch (err) {
//       console.error("Validation or API Error: ", err.errors); // Log Zod error details
//     }
//   };

//   return (
//     <Box
//       fontSize={"md"}
//       mt={4}
//       w={{ base: "100%", md: 350 }}
//       mx={"auto"}
//       color={"gray.500"}
//       p={2}
//       bg={"white"}
//     >
//       <Card boxShadow={"md"} border={"1px"} borderColor={"gray.200"}>
//         <CardHeader bg={"gray.200"}>
//           <Text>Buy airtime across all networks any time any place</Text>
//         </CardHeader>
//         <CardBody>
//           <Text pb={2}>Buy airtime for</Text>

//           {/* Radio Group to choose between Self and Other */}
//           <RadioGroup onChange={setRecipient} value={recipient}>
//             <Stack direction="row">
//               <Radio value="self">Self</Radio>
//               <Radio value="other">Other</Radio>
//             </Stack>
//           </RadioGroup>

//           {/* If "Other" is selected, show the phone number input */}
//           {recipient === "other" && (
//             <Box mt={2}>
//               <FormControl>
//                 <Input
//                   variant="flushed"
//                   placeholder="Enter phone number"
//                   name="rechargeNumber" // Name to match data state
//                   value={data.rechargeNumber}
//                   onChange={handleInputChange}
//                 />
//               </FormControl>
//             </Box>
//           )}

//           <Box mt={4}>
//             {/* Input for Amount */}
//             <FormControl>
//               <Input
//                 type="number"
//                 variant="flushed"
//                 placeholder="Enter amount"
//                 name="amount"
//                 value={data.amount}
//                 onChange={handleInputChange}
//               />
//             </FormControl>
//           </Box>
//         </CardBody>

//         <CardFooter>
//           {/* Button to submit and open the modal */}
//           <Box mx={"auto"}>
//             <Button colorScheme="blue" onClick={onOpen}>
//               Next
//             </Button>
//           </Box>
//         </CardFooter>
//       </Card>

//       {/* Modal to input the Mpesa number */}
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent maxW={["90%", "400px"]} mx="auto">
//           <ModalHeader>Pay With Mpesa</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Text pb={4} fontSize={["sm", "md"]}>
//               Enter your Mpesa number, you'll get a prompt to confirm the
//               transaction
//             </Text>
//             <FormControl>
//               <Input
//                 placeholder="0700 000 000"
//                 value={mpesaNumber}
//                 onChange={handleMpesaInputChange}
//               />
//             </FormControl>
//           </ModalBody>
//           <ModalFooter>
//             <Box mx={"auto"}>
//               <Button colorScheme="green" onClick={handleSubmitMpesaNumber}>
//                 Submit
//               </Button>
//             </Box>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default BuyAirtime;

import React, { useState } from "react";
import { PayBillPush } from "../schemas/schemas"; // Ensure your Zod schema is correctly imported
import axiosClient from "../api/axiosClient";
import {
  Box,
  Text,
  FormControl,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Radio,
  RadioGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

// Function to convert local phone number to international format
const formatStkNumber = (phone) => {
  if (/^07\d{8}$/.test(phone) || /^01\d{8}$/.test(phone)) {
    return `254${phone.slice(1)}`;
  }
  return phone;
};

// Function to validate recharge number format (local 07/01 format)
const validateRechargeNumber = (phone) => {
  return /^07\d{8}$/.test(phone) || /^01\d{8}$/.test(phone);
};

const BuyAirtime = () => {
  const [recipient, setRecipient] = useState("self");
  const [data, setData] = useState({
    rechargeNumber: "",
    amount: "",
  });
  const [mpesaNumber, setMpesaNumber] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMpesaInputChange = (e) => {
    setMpesaNumber(e.target.value);
  };

  const handleSubmitMpesaNumber = async () => {
    // Assign the value of stkNumber to rechargeNumber based on recipient
    const rechargeNumber =
      recipient === "self" ? mpesaNumber : data.rechargeNumber;

    // Convert stkNumber to international format
    const formattedStkNumber = formatStkNumber(mpesaNumber);

    // Validate rechargeNumber if necessary
    let formattedRechargeNumber = rechargeNumber;
    if (recipient === "other") {
      // If "other", ensure rechargeNumber is in the correct local format
      if (!validateRechargeNumber(rechargeNumber)) {
        console.error("Invalid recharge number format");
        return;
      }
    }

    // Construct the payload with the unformatted recharge number for "self"
    const payload = {
      rechargeNumber:
        recipient === "self" ? mpesaNumber : formattedRechargeNumber,
      stkNumber: formattedStkNumber,
      amount: Number(data.amount),
    };

    console.log("Payload before validation:", payload);

    try {
      // Validate using PayBillPush schema
      const sanitized = PayBillPush.parse(payload);
      console.log("Sanitized Data:", sanitized);

      // Proceed with sending the STK push via API call if validation is successful
      const response = await axiosClient.post(
        "/payments/paybill-push",
        sanitized
      );
      console.log("STK Push Response: ", response.data);

      onClose(); // Close modal after successful validation and API call
    } catch (err) {
      console.error("Validation or API Error: ", err.errors); // Log Zod error details
    }
  };

  return (
    <Box
      fontSize={"md"}
      mt={4}
      w={{ base: "100%", md: 350 }}
      mx={"auto"}
      color={"gray.500"}
      p={2}
      bg={"white"}
    >
      <Card boxShadow={"md"} border={"1px"} borderColor={"gray.200"}>
        <CardHeader bg={"gray.200"}>
          <Text>Buy airtime across all networks any time any place</Text>
        </CardHeader>
        <CardBody>
          <Text pb={2}>Buy airtime for</Text>

          <RadioGroup onChange={setRecipient} value={recipient}>
            <Stack direction="row">
              <Radio value="self">Self</Radio>
              <Radio value="other">Other</Radio>
            </Stack>
          </RadioGroup>

          {recipient === "other" && (
            <Box mt={2}>
              <FormControl>
                <Input
                  variant="flushed"
                  placeholder="Enter phone number"
                  name="rechargeNumber"
                  value={data.rechargeNumber}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Box>
          )}

          <Box mt={4}>
            <FormControl>
              <Input
                type="number"
                variant="flushed"
                placeholder="Enter amount"
                name="amount"
                value={data.amount}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
        </CardBody>

        <CardFooter>
          <Box mx={"auto"}>
            <Button colorScheme="blue" onClick={onOpen}>
              Next
            </Button>
          </Box>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={["90%", "400px"]} mx="auto">
          <ModalHeader>Pay With Mpesa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text pb={4} fontSize={["sm", "md"]}>
              Enter your Mpesa number, you'll get a prompt to confirm the
              transaction
            </Text>
            <FormControl>
              <Input
                placeholder="0700 000 000"
                value={mpesaNumber}
                onChange={handleMpesaInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Box mx={"auto"}>
              <Button colorScheme="green" onClick={handleSubmitMpesaNumber}>
                Submit
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BuyAirtime;
