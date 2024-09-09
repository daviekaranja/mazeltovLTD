import { useToast } from "@chakra-ui/react";

const Toast = ({ title, description, status }) => {
  const toast = useToast();

  return () =>
    toast({
      title: title,
      description,
      duration: 5000,
      status,
      isClosable: true,
    });
};

export default Toast;
