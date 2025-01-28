import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Box,
  Flex,
  Text,
  Textarea,
  Icon,
  Image,
} from "@chakra-ui/react";
import { FaUpload, FaTrash } from "react-icons/fa";

const NewProductForm = () => {
  const [productImage, setProductImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProductImage(imageUrl);
    }
  };

  const handleDeleteImage = (event) => {
    event.stopPropagation();
    setProductImage(null);
  };

  return (
    <Box p={5} mx={"auto"} w="100%">
      <Card bg={"white"} minH={450} width={["100%", 300]}>
        <Flex
          justify="center"
          align="center"
          bg="gray.100"
          h={150}
          position="relative"
          cursor="pointer"
          onClick={() => document.getElementById("imageUploadInput").click()}
        >
          {productImage ? (
            <>
              <Image
                src={productImage}
                alt="Product Preview"
                boxSize="100%"
                objectFit="cover"
              />
              <Icon
                as={FaTrash}
                boxSize={6}
                color="red.500"
                position="absolute"
                top={2}
                right={2}
                cursor="pointer"
                onClick={handleDeleteImage}
              />
            </>
          ) : (
            <Flex direction="column" align="center" justify="center">
              <Icon as={FaUpload} boxSize={8} color="gray.500" />
              <Text
                fontSize={["xs", "sm"]}
                color="gray.500"
                textAlign="center"
                mt={2}
              >
                Click here to upload product photo
              </Text>
            </Flex>
          )}
          <Input
            id="imageUploadInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </Flex>

        <Box bg={"white"} mb={4} p={2}>
          <FormControl>
            <Input variant={"flushed"} placeholder="Enter Product's Name" />
          </FormControl>

          <FormControl mb={4}>
            <Input size="sm" variant="flushed" placeholder="Price" />
          </FormControl>

          <FormControl h={100} mb={2}>
            <Textarea
              variant="flushed"
              size="sm"
              placeholder="Describe the product"
            />
          </FormControl>

          <Flex direction="row" justifyContent="center">
            <Button>Save</Button>
          </Flex>
        </Box>
      </Card>
    </Box>
  );
};

export default NewProductForm;
