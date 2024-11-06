import {
  Box,
  Container,
  Flex,
  Text,
  Link,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <Box bg="#0B1A33" color="#fff" py={6}>
      <Container maxW="container.xl">
        <Flex
          justify="space-between"
          align="center"
          direction={{ base: "column", md: "row" }}
        >
          {/* Left Side: Footer Text */}
          <Stack
            spacing={2}
            align={{ base: "center", md: "flex-start" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Text fontSize="sm">
              &copy; 2024 Phong Thủy Cơ Bản |{" "}
              <Link href="/disclaimer" _hover={{ textDecoration: "underline" }}>
                Tuyên bố miễn trừ trách nhiệm
              </Link>{" "}
              |{" "}
              <Link
                href="/privacy-policy"
                _hover={{ textDecoration: "underline" }}
              >
                Chính sách bảo mật
              </Link>{" "}
              |{" "}
              <Link href="/contact" _hover={{ textDecoration: "underline" }}>
                Liên hệ
              </Link>
            </Text>
          </Stack>

          {/* Right Side: Social Media Icons */}
          <Stack
            direction="row"
            spacing={4}
            mt={{ base: 4, md: 0 }}
            justify="center"
          >
            <IconButton
              aria-label="Facebook"
              icon={<FaFacebook />}
              bg="transparent"
              color="#fff"
              _hover={{ bg: "transparent", color: "#3b5998" }}
            />
            <IconButton
              aria-label="Instagram"
              icon={<FaInstagram />}
              bg="transparent"
              color="#fff"
              _hover={{ bg: "transparent", color: "#e4405f" }}
            />
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter />}
              bg="transparent"
              color="#fff"
              _hover={{ bg: "transparent", color: "#1DA1F2" }}
            />
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
