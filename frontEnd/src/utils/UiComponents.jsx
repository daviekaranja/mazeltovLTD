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
  Link as ChakraLink,
  List,
  ListItem,
  useToast,
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

import axios from "axios";
import axiosClient from "../api/axiosClient";

export const UploadImages = () => {
  const [images, setImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const toast = useToast();

  // Handler for selecting multiple images
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  // Handler for form submission
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axiosClient.post(
        "http://127.0.0.1:8000/upload-images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus(response.data.uploaded_images);
      toast({
        title: "Images uploaded successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error uploading images.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <form onSubmit={handleUpload}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Select Images</FormLabel>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </FormControl>
          <Button
            colorScheme="teal"
            type="submit"
            width="full"
            disabled={images.length === 0}
          >
            Upload Images
          </Button>
        </VStack>
      </form>

      {uploadStatus && (
        <Box mt={6}>
          <Text fontSize="lg" fontWeight="bold">
            Uploaded Images:
          </Text>
          <List spacing={2} mt={2}>
            {uploadStatus.map((img, index) => (
              <ListItem key={index}>
                <Text>Filename: {img.filename}</Text>
                <Text>
                  Link:
                  <ChakraLink
                    href={img.imgur_link}
                    color="teal.500"
                    isExternal
                    ml={1}
                  >
                    {img.imgur_link}
                  </ChakraLink>
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};
