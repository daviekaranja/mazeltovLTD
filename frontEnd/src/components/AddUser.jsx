// import React from "react";
// import { useState } from "react";
// import axiosClient from "../api/axiosClient";
// import {
//   Box,
//   Flex,
//   Text,
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
//   Heading,
//   FormHelperText,
// } from "@chakra-ui/react";

// const AddUser = () => {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "@Mazeltov24",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   const newUser = async (userData) => {
//     try {
//       const response = await axiosClient.post("/users/create-user", userData);

//       if (response.status === 201) {
//         // Check for 201 status code
//         console.log("User created successfully:", response.data);
//       } else {
//         console.log("Unexpected status code:", response.status);
//       }
//     } catch (error) {
//       console.error(
//         "Error creating user:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   return (
//     <Box p={2}>
//       <Box p={4} bg={"white"}>
//         <Text>Active Users</Text>
//         <Text fontSize={"sm"}>
//           {" "}
//           you have 0 active users, will appear here once you add them
//         </Text>
//       </Box>
//       <Heading mt={2} textAlign={"center"} mb={4} size={"md"}>
//         Add a new user
//       </Heading>
//       <Box mt={2} p={2} bg={"white"}>
//         <Flex alignItems={"center"}>
//           <FormControl isRequired>
//             <FormLabel>Name</FormLabel>
//             <Input
//               name="name" // Added name attribute to match the handleChange function
//               value={user.name}
//               onChange={handleChange} // Use the handleChange function
//               width={64}
//               type="text"
//               placeholder="John Doe"
//             />
//           </FormControl>

//           {/* email */}
//           <FormControl isRequired>
//             <FormLabel>Email</FormLabel>
//             <Input
//               name="email" // Added name attribute to match the handleChange function
//               value={user.email}
//               onChange={handleChange} // Use the handleChange function
//               width={64}
//               type="email"
//               placeholder="user@example.com"
//             />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Password</FormLabel>
//             <FormHelperText>The default password is @Mazeltov24</FormHelperText>
//             <Input
//               name="password" // Added name attribute to match the handleChange function
//               value={user.password}
//               onChange={handleChange} // Use the handleChange function
//               width={64}
//               type="text"
//               placeholder="password"
//             />
//           </FormControl>
//         </Flex>
//         <Box display={"flex"} p={4} mt={2} mx={"auto"}>
//           <Button
//             color={"white"}
//             bg={"brand.primary"}
//             mx={"auto"}
//             onClick={() => newUser(user)}
//           >
//             Add User
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AddUser;

import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  FormHelperText,
} from "@chakra-ui/react";

const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "@Mazeltov24", // Default password
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const newUser = async (userData) => {
    try {
      const response = await axiosClient.post("/users/create-user", userData);

      if (response.status === 201) {
        // Check for 201 status code
        console.log("User created successfully:", response.data);
      } else {
        console.log("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error(
        "Error creating user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Box p={2}>
      <Box p={4} bg={"white"}>
        <Text>Active Users</Text>
        <Text fontSize={"sm"}>
          You have 0 active users. They will appear here once you add them.
        </Text>
      </Box>
      <Heading mt={2} textAlign={"center"} mb={4} size={"md"}>
        Add a new user
      </Heading>
      <Box mt={2} p={2} bg={"white"}>
        <Flex alignItems={"center"} gap={4}>
          {/* Name */}
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={user.name}
              onChange={handleChange}
              width={64}
              type="text"
              placeholder="John Doe"
            />
          </FormControl>

          {/* Email */}
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={user.email}
              onChange={handleChange}
              width={64}
              type="email"
              placeholder="user@example.com"
            />
          </FormControl>

          {/* Password */}
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <FormHelperText>The default password is @Mazeltov24</FormHelperText>
            <Input
              name="password"
              value={user.password}
              onChange={handleChange}
              width={64}
              type="text"
              placeholder="password"
            />
          </FormControl>
        </Flex>
        <Box display={"flex"} p={4} mt={2} mx={"auto"}>
          <Button
            color={"white"}
            bg={"brand.primary"}
            mx={"auto"}
            onClick={() => newUser(user)} // Call newUser with user data
          >
            Add User
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddUser;
