import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  Button,
  VStack,
} from "@chakra-ui/react";

function MobileMenu({ isOpen, onClose }) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>

        <DrawerBody>
          <VStack align="start" spacing={4}>
            <Button variant="ghost" width="100%">
              Home
            </Button>
            <Button variant="ghost" width="100%">
              About
            </Button>
            <Button variant="ghost" width="100%">
              Services
            </Button>
            <Button variant="ghost" width="100%">
              Contact
            </Button>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default MobileMenu;
