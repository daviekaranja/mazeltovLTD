// import axiosClient from "../api/axiosClient";
// import { ZodError } from "zod";
// import {
//   Card,
//   CardBody,
//   Box,
//   Text,
//   Button,
//   Image,
//   Input,
//   VStack,
//   HStack,
//   Radio,
//   RadioGroup,
//   FormControl,
//   FormLabel,
//   Divider,
//   Heading,
//   FormErrorMessage,
//   Spinner,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { handleInputChange, validatePhoneNumber } from "./utilities";
// import { PayBillPush } from "../schemas/schemas";
// import ApiService from "./ApiService";

// import { useState, useEffect } from "react";

// export const DealCard = ({ offerdata }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [params, setParams] = useState({
//     stkNumber: "",
//     amount: "",
//     rechargeNumber: "",
//   });
//   const [showInputs, setShowInputs] = useState(false);
//   const [selection, setSelection] = useState("self");
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState("Pending");
//   const [requestMessage, setMessage] = useState("");

//   useEffect(() => {
//     if (selection === "self") {
//       // Set rechargeNumber to stkNumber when 'self' is selected
//       setParams((prevParams) => ({
//         ...prevParams,
//         rechargeNumber: prevParams.stkNumber, // Pre-fill rechargeNumber with stkNumber
//       }));
//     } else if (selection === "other") {
//       // Clear rechargeNumber when switching to 'other'
//       setParams((prevParams) => ({
//         ...prevParams,
//         rechargeNumber: "", // Clear the rechargeNumber field
//       }));
//     }
//   }, [selection, params.stkNumber]); // Run effect when selection or stkNumber changes

//   useEffect(() => {
//     if (selection === "self") {
//       setIsDisabled(!validatePhoneNumber(params.stkNumber));
//     } else if (selection === "other") {
//       setIsDisabled(
//         !(
//           validatePhoneNumber(params.stkNumber) &&
//           validatePhoneNumber(params.rechargeNumber)
//         )
//       );
//     } else {
//       console.log("not yet");
//     }
//   }, [selection, params.stkNumber, params.rechargeNumber]);

//   const handleButtonClick = (price) => {
//     setParams((prevParams) => ({
//       ...prevParams, // Spread the previous state
//       amount: price, // Update the amount property
//     }));
//     setShowInputs(true);
//   };

//   const handleSubmit = async () => {
//     const payload = {};
//     payload.stkNumber = `254${params.stkNumber.slice(1)}`;
//     payload.amount = Number(params.amount);
//     payload.rechargeNumber = params.rechargeNumber;

//     const sanitizePayload = PayBillPush.parse(payload);
//     // console.log(sanitizePayload);
//     setStatus("Pending");
//     setLoading(true);
//     onOpen();

//     const response = await ApiService.post(
//       "/payments/c2b/stk-push",
//       sanitizePayload
//     );
//     if (response.success) {
//       setStatus("Request Sent");
//       setMessage("Request Sent Wait Fot Sms Confirmation");
//       setLoading(false);
//     } else {
//       setStatus(response.message);
//       setLoading(false);
//       setMessage("An Error Occured, please try again");
//     }
//   };

//   const handleCancel = () => {
//     // reset the inputs
//     setParams({
//       stkNumber: "",
//       amount: "",
//       rechargeNumber: "",
//     });
//     setShowInputs(false);
//   };
//   return (
//     <Card
//       _hover={{
//         boxShadow: "md",
//       }}
//       bg={"white"}
//       transition={"ease-in"}
//     >
//       <CardBody p={2}>
//         <Box>
//           <Image h={10} src="https://i.postimg.cc/J02wFgLV/SAF-MAIN-LOGO.png" />
//         </Box>
//         <Box p={1}>
//           <Text fontSize={"md"} fontWeight={"bold"} color={"gray.500"}>
//             {offerdata.label} @ {offerdata.price}
//           </Text>
//         </Box>
//         <Box w={"90%"}>
//           <Modal isOpen={isOpen} onClose={onClose}>
//             <ModalOverlay />
//             <ModalContent>
//               <ModalHeader>{status}</ModalHeader>
//               <ModalCloseButton />
//               <ModalBody>
//                 {loading ? (
//                   <Box
//                     display={"flex"}
//                     flexDirection={"row"}
//                     justifyContent={"center"}
//                   >
//                     <Spinner
//                       thickness="4px"
//                       speed="0.65s"
//                       emptyColor="gray.200"
//                       color="green.500"
//                       size="xl"
//                     />
//                   </Box>
//                 ) : (
//                   <Text fontWeight={"md"}>{requestMessage}</Text>
//                 )}
//               </ModalBody>
//               <ModalFooter>
//                 <Button mx={"auto"} colorScheme="green" onClick={onClose}>
//                   Okay
//                 </Button>
//               </ModalFooter>
//             </ModalContent>
//           </Modal>
//         </Box>
//         {!showInputs ? (
//           <Button
//             size={["sm", "md"]}
//             mt={1}
//             colorScheme="green"
//             onClick={() => handleButtonClick(offerdata.price)}
//           >
//             Get Now
//           </Button>
//         ) : (
//           <VStack spacing={4} mt={4}>
//             <Divider mt={4} />
//             <Box width={"100%"}>
//               <RadioGroup onChange={setSelection} value={selection}>
//                 <Text mb={4}>I'm buying for</Text>
//                 <HStack spacing={4}>
//                   <Radio value="self">Self</Radio>
//                   <Radio value="other">Friend</Radio>
//                 </HStack>
//               </RadioGroup>
//             </Box>
//             {selection === "other" && (
//               <FormControl>
//                 {/* <FormLabel>Friend's Number</FormLabel> */}
//                 <Input
//                   maxLength={10} // Limits input to 10 characters
//                   type="text"
//                   name="rechargeNumber"
//                   variant={"flushed"}
//                   placeholder="Friend's Number"
//                   value={params.rechargeNumber}
//                   onChange={handleInputChange(setParams)}
//                 />
//               </FormControl>
//             )}

//             {/* Conditionally render inputs based on selection */}
//             <FormControl>
//               <Input
//                 maxLength={10} // Limits input to 10 characters
//                 type="text"
//                 name="stkNumber"
//                 value={params.stkNumber}
//                 variant={"flushed"}
//                 placeholder="Your Mpesa Number"
//                 onChange={handleInputChange(setParams)}
//               />
//               {/* {isInvalid && params.s && (
//                 <FormErrorMessage>Phone number is required.</FormErrorMessage>
//               )} */}
//             </FormControl>

//             <HStack spacing={4}>
//               <Button size={["sm", "md"]} onClick={handleCancel}>
//                 Cancel
//               </Button>
//               <Button
//                 isDisabled={isDisabled}
//                 size={["sm", "md"]}
//                 colorScheme="green"
//                 onClick={() => {
//                   console.log("Start Spinner");
//                   handleSubmit(params);
//                 }}
//               >
//                 Submit
//               </Button>
//             </HStack>
//           </VStack>
//         )}
//       </CardBody>
//     </Card>
//   );
// };

// import {
//   Card,
//   CardBody,
//   CardHeader,
//   CardFooter,
//   Box,
//   Text,
//   Button,
//   Image,
//   Input,
//   VStack,
//   HStack,
//   FormControl,
//   FormLabel,
//   Divider,
//   Spinner,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
//   Flex,
// } from "@chakra-ui/react";
// import { handleInputChange, validatePhoneNumber } from "./utilities";
// import { PayBillPush } from "../schemas/schemas";
// import ApiService from "./ApiService";
// import { useState, useEffect } from "react";

// export const DealCard = ({ offerdata }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [params, setParams] = useState({
//     stkNumber: "",
//     amount: "",
//   });
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState("Pending");
//   const [requestMessage, setMessage] = useState("");
//   const [showInputs, setShowInputs] = useState(false); // Controls input visibility

//   const handleButtonClick = (price) => {
//     setParams((prevParams) => ({
//       ...prevParams, // Spread the previous state
//       amount: price, // Update the amount property
//     }));
//     setShowInputs(true); // Show the input fields when "Buy" is clicked
//   };

//   useEffect(() => {
//     const regex = /^(07|01)\d{8}$/;

//     if (regex.test(params.stkNumber)) {
//       setIsDisabled(false);
//     }
//   }, [params.stkNumber]);

//   const handleSubmit = async () => {
//     console.log(params);
//     // const payload = {};
//     // payload.stkNumber = `254${params.stkNumber.slice(1)}`;
//     // payload.amount = Number(params.amount);

//     // const response = await ApiService.post(
//     //   "/payments/c2b/stk-push",
//     //   sanitizePayload
//     // );
//     // if (response.success) {
//     //   setStatus("Request Sent");
//     //   setMessage("Request Sent. Wait for SMS confirmation.");
//     //   setLoading(false);
//     // } else {
//     //   setStatus(response.message);
//     //   setLoading(false);
//     //   setMessage("An error occurred, please try again.");
//     // }
//   };

//   const handleCancel = () => {
//     // Reset the inputs
//     setParams({
//       stkNumber: "",
//       amount: "",
//     });
//     setShowInputs(false); // Hide the inputs again
//   };

//   return (
//     <Card p={0}>
//       <CardHeader p={0} maxH={9}>
//         <Image h={12} src="https://i.postimg.cc/J02wFgLV/SAF-MAIN-LOGO.png" />
//       </CardHeader>
//       <CardBody p={[1, 2]}>
//         <Text textAlign={"center"} fontSize={["sm", "md"]}>
//           {offerdata.label} @ {offerdata.price}
//         </Text>

//         {!showInputs && (
//           <Flex width={"100%"} justifyContent={"center"}>
//             <Button
//               mt={2}
//               colorScheme="green"
//               size={["sm", "md"]}
//               onClick={() => handleButtonClick(offerdata.price)}
//             >
//               Get Now
//             </Button>
//           </Flex>
//         )}

//         {showInputs ? (
//           <VStack justify={"center"} mt={2} gap={4} direction={"column"}>
//             <FormControl>
//               <FormLabel color={"gray.500"} fontSize={["sm", "md"]}>
//                 Your Mpesa Number
//               </FormLabel>
//               <Input
//                 maxLength={10}
//                 name="stkNumber"
//                 onChange={handleInputChange(setParams)}
//                 fontSize={["sm", "md"]}
//                 type="text"
//                 placeholder="0700 000 000"
//                 _placeholder={{
//                   color: "gray.400",
//                 }}
//                 variant={"flushed"}
//                 size={["sm", "md"]}
//                 width={"80%"}
//               />
//             </FormControl>

//             <Flex gap={6}>
//               <Button size={["sm", "md"]} onClick={() => handleCancel()}>
//                 Cancel
//               </Button>
//               <Button
//                 name="stkNumber"
//                 value={params.stkNumber}
//                 onChange={handleInputChange(setParams)}
//                 isDisabled={isDisabled}
//                 colorScheme="green"
//                 size={["sm", "md"]}
//                 onClick={() => handleSubmit()}
//               >
//                 Buy Now
//               </Button>
//             </Flex>
//           </VStack>
//         ) : null}

//         <Text
//           color={"gray.500"}
//           p={1}
//           mt={2}
//           textAlign={"center"}
//           mb={-1}
//           fontSize={9}
//         >
//           Terms and conditions apply
//         </Text>
//       </CardBody>
//     </Card>
//   );
// };

import { useState, useEffect, useRef } from "react";
import { PayBillPush } from "../schemas/schemas";
import ApiService from "./ApiService";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Image,
  Input,
  VStack,
  FormControl,
  FormLabel,
  Flex,
  Text,
  Toast,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
  Textarea,
  Spinner,
} from "@chakra-ui/react";

export const DealCard = ({ offerdata }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [params, setParams] = useState({
    stkNumber: "",
    amount: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [showInputs, setShowInputs] = useState(false); // Controls input visibility
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = (price) => {
    setParams((prevParams) => ({
      ...prevParams,
      amount: price,
    }));
    setShowInputs(true);
  };

  // This will handle input changes for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  // Effect to check if the phone number is valid
  useEffect(() => {
    const regex = /^(07|01)\d{8}$/;

    if (regex.test(params.stkNumber)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true); // Disable if regex does not match
    }
  }, [params.stkNumber]);

  const handleSubmit = async () => {
    // setStatus(true);
    const payload = params;
    payload.stkNumber = `254${payload.stkNumber.slice(1)}`;
    onOpen();
    setIsLoading(true);
    // setStatus(false);
    const response = await ApiService.post("payments/c2b/stk-push", payload);
    if (response) {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setParams({
      stkNumber: "",
      amount: "",
    });
    setShowInputs(false);
  };

  return (
    <Card
      p={0}
      border="1px solid transparent" // Initial transparent border
      transition="border-color 0.3s ease-in-out, transform 0.3s ease-in-out" // Smooth transition for border color and scaling
      _hover={{
        borderColor: "brand.primary", // Change border color on hover
        transform: "scale(1.02)", // Scale the card slightly on hover
      }}
    >
      <CardHeader p={0} maxH={9}>
        <Image h={12} src="https://i.postimg.cc/J02wFgLV/SAF-MAIN-LOGO.png" />
      </CardHeader>
      <CardBody p={[1, 2]}>
        <Text
          color={"green.500"}
          fontWeight={"bold"}
          textAlign={"center"}
          fontSize={["sm", "md"]}
        >
          {offerdata.label} @ {offerdata.price}
        </Text>

        {!showInputs && (
          <Flex width={"100%"} justifyContent={"center"}>
            <Button
              mt={2}
              colorScheme="green"
              size={["sm", "md"]}
              onClick={() => handleButtonClick(offerdata.price)}
              transition={"ease-in"}
            >
              Get Now
            </Button>
          </Flex>
        )}

        {/* Modal for displaying loading or success message */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            maxW={["90%", "70%", "50%"]} // Set responsive max-width
            p={[2, 4]}
          >
            <ModalHeader>
              {isLoading ? "Processing Request" : "Request Sent"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {isLoading ? (
                <Flex justifyContent="center" alignItems="center">
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                  {/* Spinner while loading */}
                </Flex>
              ) : (
                "Your request has been sent. Please wait for confirmation."
              )}
            </ModalBody>

            <ModalFooter>
              {!isLoading && (
                <Button colorScheme="blue" onClick={onClose}>
                  Okay
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* {status ? (
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Request Sent
                </AlertDialogHeader>

                <AlertDialogBody>
                  Your request has been sent. Please wait for confirmation.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Okay
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        ) : null} */}

        {showInputs ? (
          <VStack p={2} justify={"center"} mt={2} gap={4} direction={"column"}>
            <FormControl>
              <FormLabel color={"gray.500"} fontSize={["sm", "md"]}>
                Enter Your Mpesa Number
              </FormLabel>
              <Input
                maxLength={10}
                name="stkNumber"
                onChange={handleInputChange}
                fontSize={["sm", "md"]}
                type="text"
                placeholder="0700 000 000"
                _placeholder={{
                  color: "gray.400",
                }}
                variant={"flushed"}
                size={["sm", "md"]}
                width={"80%"}
              />
            </FormControl>

            <Flex gap={6}>
              <Button size={["sm", "md"]} onClick={() => handleCancel()}>
                Cancel
              </Button>
              <Button
                colorScheme="green"
                size={["sm", "md"]}
                isDisabled={isDisabled}
                onClick={() => handleSubmit()}
              >
                Buy Now
              </Button>
            </Flex>
          </VStack>
        ) : null}

        <Text
          colorScheme="'blue"
          p={1}
          mt={2}
          textAlign={"center"}
          mb={-1}
          fontSize={9}
        >
          Terms and conditions apply
        </Text>
      </CardBody>
    </Card>
  );
};

export const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  onBlur,
  size,
}) => (
  <FormControl isRequired>
    <FormLabel>{label}</FormLabel>
    <Input
      variant={"flushed"}
      size={size}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  </FormControl>
);

export const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  size,
}) => (
  <FormControl isRequired>
    <FormLabel>{label}</FormLabel>
    <Select
      size={size}
      name={name}
      value={value}
      onChange={onChange}
      placeholder="Select category"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  </FormControl>
);

export const TextareaField = ({ label, name, value, onChange, size }) => (
  <FormControl isRequired>
    <FormLabel>{label}</FormLabel>
    <Textarea name={name} size={size} value={value} onChange={onChange} />
  </FormControl>
);
