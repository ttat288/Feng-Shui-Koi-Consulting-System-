import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { IoMenuOutline } from "react-icons/io5";
import { renderThumb, renderTrack, renderView } from "../scrollbar/Scrollbar";
import SidebarContent from "./Content";

function Sidebar(props) {
  const { routes } = props;

  // Chakra color modes for light and dark mode
  const sidebarBg = useColorModeValue("white", "gray.900");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "14px 17px 40px 4px rgba(0, 0, 0, 0.28)"
  );
  const borderRadius = "20px";
  const variantChange = "0.2s ease-in-out";

  return (
    <Box display={{ sm: "none", xl: "block" }} position="fixed" minH="100%">
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w="250px"
        h="100vh"
        p="15px"
        m="10px"
        borderRadius={borderRadius}
        boxShadow={shadow}
        overflowX="hidden"
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          {/* Sidebar header with logo or title */}
          <Flex align="center" mb="30px" justify="center">
            <Text fontSize="2xl" fontWeight="bold" color="teal.500">
              Koi System
            </Text>
          </Flex>

          {/* Sidebar navigation links */}
          <SidebarContent routes={routes} />
        </Scrollbars>
      </Box>
    </Box>
  );
}

// Responsive sidebar for mobile view
export function SidebarResponsive(props) {
  const { routes } = props;
  const sidebarBg = useColorModeValue("white", "gray.900");
  const menuColor = useColorModeValue("gray.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
      <Flex ref={btnRef} w="max-content" h="max-content" onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          w="24px"
          h="24px"
          _hover={{ cursor: "pointer", color: "teal.400" }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={sidebarBg} borderRadius="10px">
          <DrawerCloseButton _focus={{ boxShadow: "none" }} />
          <DrawerBody p="0">
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              <SidebarContent routes={routes} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default Sidebar;
