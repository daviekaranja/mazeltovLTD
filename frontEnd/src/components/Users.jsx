import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import axiosClient from "../api/axiosClient";
import UserTable from "./CollapsibleTable";
import AddUser from "./AddUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axiosClient.get("/users/get-users");
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.log("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
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
