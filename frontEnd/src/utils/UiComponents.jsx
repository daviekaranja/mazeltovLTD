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
  Box,
  useDisclosure,
  Select,
  Textarea,
  Link as ChakraLink,
  IconButton,
  HStack,
  Progress,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useImgurUpload } from "../hooks/useImgurUpload";
import upload from "/src/images/upload.svg";

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

// export const ImageUpload = () => {
//   const [images, setImages] = useState([]); // Array to hold selected images
//   const [isFocused, setIsFocused] = useState(false); // Track if the component is focused

//   // Handle file selection
//   const handleFileSelect = (event) => {
//     event.preventDefault();
//     const file = event.target.files[0];
//     if (file && images.length < 6) {
//       const imageUrl = URL.createObjectURL(file);
//       setImages([
//         ...images,
//         { url: imageUrl, status: "idle", progress: 0, file },
//       ]); // Add new image with default status and progress
//     }
//   };

//   // Prevent default behavior for drag-and-drop
//   const handleDrop = (event) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];
//     if (file && images.length < 6) {
//       const imageUrl = URL.createObjectURL(file);
//       setImages([
//         ...images,
//         { url: imageUrl, status: "idle", progress: 0, file },
//       ]);
//     }
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   // Upload function to Imgur
//   const uploadToImgur = async (index, file) => {
//     setImages((prevImages) => {
//       const newImages = [...prevImages];
//       newImages[index].status = "uploading"; // Change status to uploading
//       return newImages;
//     });

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const response = await fetch("https://api.imgur.com/3/image", {
//         method: "POST",
//         headers: {
//           Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
//         },
//         body: formData,
//       });
//       const data = await response.json();

//       if (data.success) {
//         // If successful, update the image status and link
//         setImages((prevImages) => {
//           const newImages = [...prevImages];
//           newImages[index].status = "done";
//           newImages[index].link = data.data.link; // Imgur link
//           newImages[index].progress = 100; // Set progress to 100%
//           return newImages;
//         });
//         console.log("Uploaded successfully:", data.data.link); // Print the Imgur link to the console
//       } else {
//         // If failed, set status to failed
//         setImages((prevImages) => {
//           const newImages = [...prevImages];
//           newImages[index].status = "failed";
//           return newImages;
//         });
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       setImages((prevImages) => {
//         const newImages = [...prevImages];
//         newImages[index].status = "failed";
//         return newImages;
//       });
//     }
//   };

//   // Handle image removal
//   const handleRemoveImage = (index) => {
//     setImages(images.filter((_, i) => i !== index)); // Remove image from array
//   };

//   // Retry failed upload
//   const handleRetryUpload = (index) => {
//     uploadToImgur(index, images[index].file); // Retry the upload for the specific image
//   };

//   // Handle focus and blur
//   const handleFocus = () => {
//     setIsFocused(true); // Set focus state to true when component is focused
//   };

//   const handleBlur = () => {
//     setIsFocused(false); // Set focus state to false when component loses focus
//     // Trigger upload if there are any images that are still "idle"
//     if (images.some((image) => image.status === "idle")) {
//       images.forEach((image, index) => {
//         if (image.status === "idle") {
//           uploadToImgur(index, image.file); // Start uploading any image that is still idle
//         }
//       });
//     }
//   };

//   // Helper function to get color based on status
//   const getColorByStatus = (status) => {
//     switch (status) {
//       case "uploading":
//         return "blue.500";
//       case "done":
//         return "green.500";
//       case "failed":
//         return "red.500";
//       default:
//         return "gray.500";
//     }
//   };

//   return (
//     <VStack spacing={4} align="start" onFocus={handleFocus} onBlur={handleBlur}>
//       {/* Drop Zone */}
//       <Box
//         as="label"
//         htmlFor="file-input"
//         border="2px dashed"
//         borderColor="gray.300"
//         padding={6}
//         borderRadius="md"
//         cursor="pointer"
//         _hover={{ borderColor: "gray.400" }}
//         width="full"
//         textAlign="center"
//         onDrop={handleDrop} // Add drop handler
//         onDragOver={handleDragOver} // Prevent default dragover behavior
//         tabIndex={0} // Ensure the element can lose focus
//       >
//         {images.length < 6
//           ? "Click or drag an image to upload"
//           : "Maximum 6 images reached"}
//         <input
//           id="file-input"
//           type="file"
//           accept="image/*"
//           onChange={handleFileSelect}
//           style={{ display: "none" }}
//           disabled={images.length >= 6} // Disable input if max images reached
//         />
//       </Box>

//       {/* Image Previews */}
//       <HStack spacing={4} wrap="wrap">
//         {images.map((image, index) => (
//           <Box key={index} position="relative" width="100px">
//             <Image
//               src={image.url}
//               alt={`Selected image ${index + 1}`}
//               boxSize="100px"
//               borderRadius="md"
//             />
//             {/* Close Button */}
//             <IconButton
//               icon={<CloseIcon />}
//               size="xs"
//               position="absolute"
//               top="0"
//               right="0"
//               onClick={() => handleRemoveImage(index)}
//               aria-label="Remove image"
//             />
//             {/* Status Placeholder */}
//             {image.status === "uploading" && (
//               <Progress size="sm" value={image.progress} colorScheme="blue" />
//             )}
//             {image.status === "failed" && (
//               <Button size="xs" onClick={() => handleRetryUpload(index)}>
//                 Retry
//               </Button>
//             )}
//             <Text
//               fontSize="sm"
//               color={getColorByStatus(image.status)}
//               textAlign="center"
//             >
//               {image.status}
//             </Text>
//           </Box>
//         ))}
//       </HStack>
//     </VStack>
//   );
// };

export const ImageUpload = ({ onImagesSelected }) => {
  const [images, setImages] = useState([]); // Array to hold selected images
  const [isFocused, setIsFocused] = useState(false); // Track if the component is focused

  // Handle file selection
  const handleFileSelect = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file && images.length < 6) {
      const imageUrl = URL.createObjectURL(file);
      const newImage = { url: imageUrl, status: "idle", progress: 0, file };
      const updatedImages = [...images, newImage];
      setImages(updatedImages); // Add new image with default status and progress
      if (onImagesSelected) {
        onImagesSelected(updatedImages); // Pass selected images to the parent
      }
    }
  };

  // Prevent default behavior for drag-and-drop
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && images.length < 6) {
      const imageUrl = URL.createObjectURL(file);
      const newImage = { url: imageUrl, status: "idle", progress: 0, file };
      const updatedImages = [...images, newImage];
      setImages(updatedImages);
      if (onImagesSelected) {
        onImagesSelected(updatedImages); // Pass selected images to the parent
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`image-upload ${isFocused ? "focused" : ""}`}
    >
      <input
        type="file"
        onChange={handleFileSelect}
        accept="image/*"
        className="file-input"
      />
      <div className="preview-container">
        {images.map((image, index) => (
          <div key={index} className="image-preview">
            <img src={image.url} alt={`Preview ${index}`} />
            <p>Status: {image.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
