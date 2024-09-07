// import React, { useState } from "react";
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
//   const [get, setGet] = useState(localStorage.setItem("get", false));
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "@Mazeltov24", // Default password
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
//         setUser({
//           name: "",
//           email: "",
//           password: "",
//         });
//         setGet(true);
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
//       <Text textAlign={"center"} color={"gray.600"}>
//         Add a new user
//       </Text>
//       <Box mt={2} p={2} bg={"white"}>
//         <Flex alignItems={"center"} gap={4}>
//           {/* Name */}
//           <FormControl isRequired>
//             <FormLabel>Name</FormLabel>
//             <Input
//               h={8}
//               name="name"
//               value={user.name}
//               onChange={handleChange}
//               width={64}
//               type="text"
//               placeholder="John Doe"
//             />
//           </FormControl>

//           {/* Email */}
//           <FormControl isRequired>
//             <FormLabel>Email</FormLabel>
//             <Input
//               name="email"
//               value={user.email}
//               onChange={handleChange}
//               width={64}
//               type="email"
//               placeholder="user@example.com"
//             />
//           </FormControl>

//           {/* Password */}
//           <FormControl isRequired>
//             <FormLabel>Password</FormLabel>
//             <FormHelperText>The default password is @Mazeltov24</FormHelperText>
//             <Input
//               name="password"
//               value={user.password}
//               onChange={handleChange}
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
//             onClick={() => newUser(user)} // Call newUser with user data
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
  FormHelperText,
} from "@chakra-ui/react";

const AddUser = ({ onUserAdded }) => {
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
        setUser({
          name: "",
          email: "",
          password: "",
        });
        if (onUserAdded) {
          onUserAdded(); // Call the callback function to refresh the user list
        }
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
      <Text textAlign={"center"} color={"gray.600"}>
        Add a new user
      </Text>
      <Box mt={2} p={2} bg={"white"}>
        <Flex alignItems={"center"} gap={4}>
          {/* Name */}
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              h={8}
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
