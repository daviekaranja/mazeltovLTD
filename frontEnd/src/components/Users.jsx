// import React, { useState, useEffect } from "react";
// import AddUser from "./AddUser";
// import {
//   Box,
//   Flex,
//   Text,
//   Heading,
//   Spinner,
//   Checkbox,
//   CheckboxGroup,
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
// } from "@chakra-ui/react";
// import axiosClient from "../api/axiosClient";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true); // Loading state

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axiosClient.get("/users/get-users");

//         if (response.status === 200) {
//           setUsers(response.data);
//           console.log(response.data); // Assuming response contains user data
//         } else {
//           console.log("Unexpected status code:", response.status);
//         }
//       } catch (error) {
//         console.error(error.response?.data || error.message);
//       }
//     };

//     fetchUsers(); // Call the async function inside useEffect
//   }, []); // Empty dependency array to only run once when the component mounts

//   return (
//     <Box width={"80%"} p={4}>
//       <Box bg={"white"} rounded={"lg"} boxShadow={"sm"}>
//         <TableContainer>
//           <Table variant="simple">
//             {/* <TableCaption>Active Users {users.length}</TableCaption> */}
//             <Thead>
//               <Tr>
//                 <Th>Name</Th>
//                 <Th>Email</Th>
//                 <Th> Products</Th>
//                 <Th>Active</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {users.length > 0 ? (
//                 users.map((user) => (
//                   <Tr fontSize={"md"} key={user.id}>
//                     <Td>{user.name}</Td>
//                     <Td>{user.email}</Td>
//                     <Td>{user.products?.length || 0}</Td>{" "}
//                     <Td>
//                       <Checkbox>{user.is_active}</Checkbox>
//                     </Td>
//                   </Tr>
//                 ))
//               ) : (
//                 <Tr>
//                   <Td colSpan="3" textAlign="center">
//                     No users found.
//                   </Td>
//                 </Tr>
//               )}
//             </Tbody>
//           </Table>
//         </TableContainer>
//       </Box>
//       <Flex mt={6} bg={"white"} width={"100%"}>
//         <AddUser />
//       </Flex>
//     </Box>
//   );
// };

// export default Users;

import React, { useState, useEffect } from "react";
import AddUser from "./AddUser";
import {
  Box,
  Flex,
  Text,
  Heading,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import axiosClient from "../api/axiosClient";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Function to fetch users
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
    fetchUsers(); // Fetch users when component mounts
  }, []);

  // Callback function to refresh the user list
  const handleUserAdded = () => {
    fetchUsers(); // Refresh user list
  };

  return (
    <Box width={"80%"} p={4}>
      <Box bg={"white"} rounded={"lg"} boxShadow={"sm"}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Products</Th>
                <Th>Active</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <Tr fontSize={"md"} key={user.id}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.products?.length || 0}</Td>
                    <Td>
                      <Checkbox isChecked={user.is_active}>Active</Checkbox>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="4" textAlign="center">
                    No users found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Flex mt={6} bg={"white"} width={"100%"}>
        <AddUser onUserAdded={handleUserAdded} />
      </Flex>
    </Box>
  );
};

export default Users;
