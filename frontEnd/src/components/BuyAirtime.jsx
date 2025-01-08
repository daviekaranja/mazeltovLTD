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
  Heading,
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
      minH={"100vh"}
      fontSize={"md"}
      mt={4}
      w="100%"
      mx={"auto"}
      color={"gray.500"}
      p={[4, 6, 8]}
      bg={"white"}
    >
      <Card
        boxShadow={"md"}
        mx={"auto"}
        border={"1px"}
        borderColor={"gray.200"}
        maxW={["100%", 300]}
      >
        <CardHeader>
          <Text>
            Buy airtime for Safaricom, Airtel and Telkom anytime Delivery is
            instant
          </Text>
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
