import React, { useState, useEffect } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import axiosClient from "../api/axiosClient";
import UserTable from "./CollapsibleTable";
import AddUser from "./AddUser";
import ApiService from "../utils/ApiService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    const response = await ApiService.get("/users/get-users");
    if (response.success) {
      setUsers(response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <Box
        alignItems={"center"}
        display={"flex"}
        flexDirection={"column"}
        p={4}
        mt={4}
        gap={"2"}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />

        <Text>Fetching users, please wait</Text>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Box bg={"white"} rounded={"lg"} boxShadow={"sm"}>
        <UserTable users={users} defaultRowsToShow={2} />{" "}
      </Box>
      <AddUser />
    </Box>
  );
};

export default Users;
