import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";

export function SidebarLinks() {
  const location = useLocation();
  const activeColor = useColorModeValue("gray.700", "white");
  const activeIcon = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("secondaryGray.500", "white");
  const brandColor = useColorModeValue("brand.500", "brand.400");

  const routes = [
    { name: "Dashboard", path: "/admin", layout: "/admin" },
    { name: "User", path: "/user", layout: "/admin" },
  ];

  const activeRoute = (routePath) => location.pathname.includes(routePath);

  return routes.map((route, index) => (
    <NavLink key={index} to={route.layout + route.path}>
      <Box>
        <HStack
          spacing={activeRoute(route.path) ? "22px" : "26px"}
          py="5px"
          ps="10px"
        >
          <Flex w="100%" alignItems="center" justifyContent="center">
            <Box
              color={activeRoute(route.path) ? activeIcon : textColor}
              me="18px"
            >
              {route.icon} {/* Add icons if needed */}
            </Box>
            <Text
              me="auto"
              color={activeRoute(route.path) ? activeColor : textColor}
              fontWeight={activeRoute(route.path) ? "bold" : "normal"}
            >
              {route.name}
            </Text>
          </Flex>
          <Box
            h="36px"
            w="4px"
            bg={activeRoute(route.path) ? brandColor : "transparent"}
            borderRadius="5px"
          />
        </HStack>
      </Box>
    </NavLink>
  ));
}

export default SidebarLinks;
