import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Image,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import TinhBanMenh from "../../components/TinhBanMenh";

const blogs = [
  {
    id: 1,
    title: "Blog Name 1",
    description:
      "Discover the best plants to bring balance and harmony into your home",
    imageUrl:
      "https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png",
  },
];

const itemsPerPage = 8;

function Newest() {
  const [currentPage, setCurrentPage] = useState(1);
  // Dùng useColorModeValue để chọn màu nền và màu chữ cho light mode
  const bgColor = useColorModeValue("white", "gray.800"); // màu nền cho light/dark mode
  const textColor = useColorModeValue("gray.700", "gray.200"); // màu chữ cho light/dark mode

  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = blogs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      py="10"
      mt="10px" // Thêm margin-top để tránh bị đè lên header
      bg={bgColor} // Sử dụng bgColor đã chọn
      w="95%"
    >
      <Flex
        direction="row"
        wrap="wrap"
        justifyContent="space-between"
        width="100%"
      >
        {currentBlogs.map((blog) => (
          <Box
            key={blog.id}
            w={{ base: "full", md: "23%" }} // Chiều rộng của mỗi box
            mb={4}
            bg={useColorModeValue("white", "gray.700")} // Đảm bảo background trắng cho chế độ sáng
            boxShadow="md"
            borderRadius="lg"
            p={4}
          >
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              borderRadius="lg"
              w="full"
              h="200px"
              objectFit="cover"
            />
            <Box pt={4}>
              <Text fontSize="xl" fontWeight="bold" color={textColor}>
                {blog.title}
              </Text>
              <Text fontSize="sm" color={textColor}>
                {blog.description}
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>

      <Flex mt={4} justifyContent="space-between" w="full" maxW="1200px">
        <Button
          isDisabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          size="lg"
          colorScheme="teal"
          variant="solid"
          borderRadius="lg"
        >
          Previous
        </Button>
        <Button
          isDisabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          size="lg"
          colorScheme="teal"
          variant="solid"
          borderRadius="lg"
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
}

export default Newest;
