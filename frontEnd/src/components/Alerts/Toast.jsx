import { useToast } from "@chakra-ui/react";

const Toast = ({ title, description, status }) => {
  const toast = useToast();

  return () =>
    toast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
    });
};

export default Toast;
