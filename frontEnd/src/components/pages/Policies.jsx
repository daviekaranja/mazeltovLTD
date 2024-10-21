import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Terms, PrivacyPolicy, DataPolicy } from "../Legal";

const Policies = () => (
  <Box>
    <Box p={5}>
      <Heading mb={4}>Policy Center</Heading>
      <Text fontSize={["md", "lg"]} mb={4}>
        Welcome to Mazeltov Commercial Agencies Ltd’s policy center. Here you
        will find important documents that outline how we operate, protect your
        personal information, and ensure transparency in our services. Our
        policies include the Terms and Conditions, Data Policy, and Privacy
        Policy, each providing essential information regarding your rights and
        our responsibilities as we interact with you.
      </Text>

      <Text fontSize={["md", "lg"]}>
        Please take the time to review these policies carefully. They explain
        the rules and guidelines governing our services, how we handle your
        data, and the steps we take to protect your privacy. By continuing to
        use our website, you acknowledge that you have read and understood these
        documents.
      </Text>
    </Box>
    {/*  */}
    <Tabs mt={2} variant="enclosed" colorScheme="teal" isFitted>
      <TabList>
        <Tab>Terms & Conditions</Tab>
        <Tab>Data Policy</Tab>
        <Tab>Privacy Policy</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Terms />
        </TabPanel>
        <TabPanel>
          <DataPolicy />
        </TabPanel>
        <TabPanel>
          <PrivacyPolicy />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
);
export default Policies;
