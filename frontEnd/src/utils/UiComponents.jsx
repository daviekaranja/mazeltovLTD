import axiosClient from "../api/axiosClient";
import { ZodError } from "zod";
import {
  Card,
  CardBody,
  Box,
  Text,
  Button,
  Image,
  Input,
  VStack,
  HStack,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Divider,
  Heading,
  FormErrorMessage,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { handleInputChange, validatePhoneNumber } from "./utilities";
import { PayBillPush } from "../schemas/schemas";
import ApiService from "./ApiService";

import { useState, useEffect } from "react";

export const DealCard = ({ offerdata }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [params, setParams] = useState({
    stkNumber: "",
    amount: "",
    rechargeNumber: "",
  });
  const [showInputs, setShowInputs] = useState(false);
  const [selection, setSelection] = useState("self");
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [requestMessage, setMessage] = useState("");

  useEffect(() => {
    if (selection === "self") {
      // Set rechargeNumber to stkNumber when 'self' is selected
      setParams((prevParams) => ({
        ...prevParams,
        rechargeNumber: prevParams.stkNumber, // Pre-fill rechargeNumber with stkNumber
      }));
    } else if (selection === "other") {
      // Clear rechargeNumber when switching to 'other'
      setParams((prevParams) => ({
        ...prevParams,
        rechargeNumber: "", // Clear the rechargeNumber field
      }));
    }
  }, [selection, params.stkNumber]); // Run effect when selection or stkNumber changes

  useEffect(() => {
    if (selection === "self") {
      setIsDisabled(!validatePhoneNumber(params.stkNumber));
    } else if (selection === "other") {
      setIsDisabled(
        !(
          validatePhoneNumber(params.stkNumber) &&
          validatePhoneNumber(params.rechargeNumber)
        )
      );
    } else {
      console.log("not yet");
    }
  }, [selection, params.stkNumber, params.rechargeNumber]);

  const handleButtonClick = (price) => {
    setParams((prevParams) => ({
      ...prevParams, // Spread the previous state
      amount: price, // Update the amount property
    }));
    setShowInputs(true);
  };

  const handleSubmit = async () => {
    const payload = {};
    payload.stkNumber = `254${params.stkNumber.slice(1)}`;
    payload.amount = Number(params.amount);
    payload.rechargeNumber = params.rechargeNumber;

    const sanitizePayload = PayBillPush.parse(payload);
    // console.log(sanitizePayload);
    setStatus("Pending");
    setLoading(true);
    onOpen();

    const response = await ApiService.post(
      "/payments/c2b/stk-push",
      sanitizePayload
    );
    if (response.success) {
      setStatus("Request Sent");
      setMessage("Request Sent Wait Fot Sms Confirmation");
      setLoading(false);
    } else {
      setStatus(response.message);
      setLoading(false);
      setMessage("An Error Occured, please try again");
    }
  };

  const handleCancel = () => {
    // reset the inputs
    setParams({
      stkNumber: "",
      amount: "",
      rechargeNumber: "",
    });
    setShowInputs(false);
  };
  return (
    <Card
      _hover={{
        boxShadow: "md",
      }}
      bg={"white"}
      transition={"ease-in"}
    >
      <CardBody p={2}>
        <Box>
          <Image h={10} src="https://i.postimg.cc/J02wFgLV/SAF-MAIN-LOGO.png" />
        </Box>
        <Box p={1}>
          <Text fontSize={"md"} fontWeight={"bold"} color={"gray.500"}>
            {offerdata.label} @ {offerdata.price}
          </Text>
        </Box>
        <Box w={"90%"}>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{status}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {loading ? (
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"center"}
                  >
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="green.500"
                      size="xl"
                    />
                  </Box>
                ) : (
                  <Text fontWeight={"md"}>{requestMessage}</Text>
                )}
              </ModalBody>
              <ModalFooter>
                <Button mx={"auto"} colorScheme="green" onClick={onClose}>
                  Okay
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        {!showInputs ? (
          <Button
            size={["sm", "md"]}
            mt={1}
            colorScheme="green"
            onClick={() => handleButtonClick(offerdata.price)}
          >
            Get Now
          </Button>
        ) : (
          <VStack spacing={4} mt={4}>
            <Divider mt={4} />
            <Box width={"100%"}>
              <RadioGroup onChange={setSelection} value={selection}>
                <Text mb={4}>I'm buying for</Text>
                <HStack spacing={4}>
                  <Radio value="self">Self</Radio>
                  <Radio value="other">Friend</Radio>
                </HStack>
              </RadioGroup>
            </Box>
            {selection === "other" && (
              <FormControl>
                {/* <FormLabel>Friend's Number</FormLabel> */}
                <Input
                  maxLength={10} // Limits input to 10 characters
                  type="text"
                  name="rechargeNumber"
                  variant={"flushed"}
                  placeholder="Friend's Number"
                  value={params.rechargeNumber}
                  onChange={handleInputChange(setParams)}
                />
              </FormControl>
            )}

            {/* Conditionally render inputs based on selection */}
            <FormControl>
              <Input
                maxLength={10} // Limits input to 10 characters
                type="text"
                name="stkNumber"
                value={params.stkNumber}
                variant={"flushed"}
                placeholder="Your Mpesa Number"
                onChange={handleInputChange(setParams)}
              />
              {/* {isInvalid && params.s && (
                <FormErrorMessage>Phone number is required.</FormErrorMessage>
              )} */}
            </FormControl>

            <HStack spacing={4}>
              <Button size={["sm", "md"]} onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                isDisabled={isDisabled}
                size={["sm", "md"]}
                colorScheme="green"
                onClick={() => {
                  console.log("Start Spinner");
                  handleSubmit(params);
                }}
              >
                Submit
              </Button>
            </HStack>
          </VStack>
        )}
      </CardBody>
    </Card>
  );
};
