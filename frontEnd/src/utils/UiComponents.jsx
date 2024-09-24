import axiosClient from "../api/axiosClient";
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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";

export const DealCard = ({ offerdata }) => {
  const [showInputs, setShowInputs] = useState(false);
  const [selection, setSelection] = useState("self");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [friendPhoneNumber, setFriendPhoneNumber] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handleButtonClick = () => {
    setShowInputs(true);
  };

  const handleSubmit = async () => {
    if (
      (selection === "self" && phoneNumber) ||
      (selection === "other" && phoneNumber && friendPhoneNumber)
    ) {
      const response = await axiosClient.post("/till-push");
      if (response) {
        console.log(response.status);
      }
      console.log("Form Submitted");
      // Reset inputs after submit
      setPhoneNumber("");
      setFriendPhoneNumber("");
      setShowInputs(false);
    } else {
      setIsInvalid(true); // Show invalid form message
    }
  };

  const handleCancel = () => {
    setShowInputs(false);
    setPhoneNumber("");
    setFriendPhoneNumber("");
    setIsInvalid(false);
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
        {!showInputs ? (
          <Button
            size={["sm", "md"]}
            mt={1}
            colorScheme="green"
            onClick={handleButtonClick}
          >
            Get Now
          </Button>
        ) : (
          <VStack spacing={4} mt={4}>
            <Divider mt={4} border={"1px"} borderColor={"green"} />
            <Box width={"100%"}>
              <Box>
                <Image
                  mx={"auto"}
                  h={20}
                  src="https://i.postimg.cc/0QjGSrB9/Microsoft-Teams-image-41.jpg"
                />
              </Box>
              <RadioGroup onChange={setSelection} value={selection}>
                <Text mb={4}>I'm buying for</Text>
                <HStack spacing={4}>
                  <Radio value="self">Self</Radio>
                  <Radio value="other">Friend</Radio>
                </HStack>
              </RadioGroup>
            </Box>

            {selection === "other" && (
              <FormControl isInvalid={isInvalid && !friendPhoneNumber}>
                {/* <FormLabel>Friend's Number</FormLabel> */}
                <Input
                  variant={"flushed"}
                  placeholder="Friend's Number"
                  value={friendPhoneNumber}
                  onChange={(e) => setFriendPhoneNumber(e.target.value)}
                />
                {isInvalid && !friendPhoneNumber && (
                  <FormErrorMessage>
                    Friend's phone number is required.
                  </FormErrorMessage>
                )}
              </FormControl>
            )}

            {/* Conditionally render inputs based on selection */}
            <FormControl isInvalid={isInvalid && !phoneNumber}>
              {/* <FormLabel>Your Number</FormLabel> */}
              <Input
                variant={"flushed"}
                placeholder="Your Mpesa Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {isInvalid && !phoneNumber && (
                <FormErrorMessage>Phone number is required.</FormErrorMessage>
              )}
            </FormControl>

            <HStack spacing={4}>
              <Button size={["sm", "md"]} onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                size={["sm", "md"]}
                colorScheme="green"
                onClick={handleSubmit}
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
