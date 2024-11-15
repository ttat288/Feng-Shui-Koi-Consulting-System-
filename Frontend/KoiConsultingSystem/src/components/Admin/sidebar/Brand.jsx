// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
// import { HorizonLogo } from "../../Admin/icon/IconBox";

export function SidebarBrand() {
  // Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align="center" direction="column">
      <Text as="h1" fontSize="2xl" color={logoColor} my="32px">
        Koi
      </Text>
      {/* <HSeparator mb="20px" /> */}
    </Flex>
  );
}

export default SidebarBrand;
