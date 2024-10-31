import { useState, useEffect, useRef } from "react";
import { PayBillPush } from "../schemas/schemas";
import axiosClient from "../api/axiosClient";
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

export const ImageUploader = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const imageUrl = await onImageUpload(selectedFile);
      console.log("Uploaded Image URL:", imageUrl); // Use this for debugging
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {imagePreview && <img src={imagePreview} alt="Preview" width={100} />}
      <button onClick={handleUpload}>Upload to Imgur</button>
    </div>
  );
};

// export default ImageUploader;
