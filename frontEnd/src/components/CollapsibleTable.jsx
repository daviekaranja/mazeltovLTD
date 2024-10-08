import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Button,
} from "@chakra-ui/react";

const UserTable = ({ users, defaultRowsToShow = 3 }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Handle accordion expansion
  const toggleAccordion = () => setIsExpanded(!isExpanded);

  return (
    <TableContainer>
      <Table variant="simple">
        {/* Table Headers */}
        <Thead>
          <Tr>
            <Th width="30%">Name</Th>
            <Th width="35%">Email</Th>
            <Th width="15%">Products</Th>
            <Th width="20%">Active</Th>
            <Th width="20%">Remove</Th>
          </Tr>
        </Thead>

        {/* Table Body */}
        <Tbody>
          {/* Display first N rows */}
          {users.length > 0 ? (
            users.slice(0, defaultRowsToShow).map((user) => (
              <Tr fontSize={"md"} key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.products?.length || 0}</Td>
                <Td>
                  <Checkbox isChecked={user.is_active}>Active</Checkbox>
                </Td>
                <Td>
                  <Button
                    isDisabled
                    size={"sm"}
                    _hover={{
                      bg: "red",
                      color: "white",
                    }}
                  >
                    Remove
                  </Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="4" textAlign="center">
                <Text>No users found.</Text>
              </Td>
            </Tr>
          )}

          {/* Render remaining rows if the accordion is expanded */}
          {isExpanded &&
            users.slice(defaultRowsToShow).map((user) => (
              <Tr fontSize={"md"} key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.products?.length || 0}</Td>
                <Td>
                  <Checkbox isChecked={user.is_active}>Active</Checkbox>
                </Td>
                <Td>
                  <Button
                    isDisabled
                    size={"sm"}
                    _hover={{
                      bg: "red",
                      color: "white",
                    }}
                  >
                    Remove
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      {/* Accordion Control */}
      {users.length > defaultRowsToShow && (
        <Box>
          <Accordion allowToggle>
            <AccordionItem border={"none"}>
              <AccordionButton onClick={toggleAccordion}>
                <Box flex="1" color={"blue.500"} textAlign="center">
                  {isExpanded ? "Show Less" : "Show More"}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} />
            </AccordionItem>
          </Accordion>
        </Box>
      )}
    </TableContainer>
  );
};

export default UserTable;
