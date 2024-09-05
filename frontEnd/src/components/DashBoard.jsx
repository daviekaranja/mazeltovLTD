import {
  Box,
  Heading,
  SimpleGrid,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
} from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <Box p={1} h={50}>
      <Heading bg={"white"} mb={2} p={4} color={"brand.primary"}>
        Hello Dan, Welcome
      </Heading>
      <Box>
        <SimpleGrid
          fontSize={"sm"}
          color={"gray.400"}
          rounded={"lg"}
          columns={4}
          gap={2}
        >
          <Card p={0} fontSize={"sm"} bg={"white"}>
            <CardBody>
              <Text>Total Reach This Week</Text>
              <Text fontWeight={"medium"}>3.97k visits</Text>
            </CardBody>
          </Card>
          <Card bg={"white"}>
            <CardBody>
              <Text>Total Orders This Month</Text>
              <Text color={"blue.500"}>500</Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Text fontSize={"md"}>Market Share</Text>
              <Box color={"gray.500"}>
                <p>Samsung: 43%</p>
                <p>Airtel Mifi: 23%</p>
                <p>Mkopa: 34%</p>
              </Box>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Text>Weather</Text>
              <p>Nairobi Kenya</p>
              <Box></Box>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Box>
      <Box rounded={"lg"} mt={2} h={450}>
        <SimpleGrid h={"100%"} spacing={2} columns={2}>
          <Card>
            <CardHeader bg={"gray.50"}>Best Performing Products</CardHeader>
            <CardBody>
              <Text mt={20} fontSize={"sm"} color={"gray.400"}>
                Not enough Data, it will appear here once the feature is
                implemented
              </Text>
            </CardBody>
            <CardFooter bg={"gray.50"}></CardFooter>
          </Card>
          <Card>
            <CardHeader bg={"gray.50"}>
              Filter Sales Based on Month, Year, Week
            </CardHeader>
            <CardBody>
              <Text mt={20} fontSize={"sm"} color={"gray.400"}>
                Your Site is not receiving Payments, Please Connect To an API
                for this feature,
              </Text>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Dashboard;
