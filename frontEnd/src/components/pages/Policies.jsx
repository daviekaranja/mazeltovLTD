import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Terms, PrivacyPolicy, DataPolicy } from "../Legal";

const Policies = () => (
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
);
export default Policies;
