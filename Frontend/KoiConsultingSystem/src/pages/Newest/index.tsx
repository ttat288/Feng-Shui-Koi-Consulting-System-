import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Image,
  Button,
  useColorModeValue,
  IconButton,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHeart, FaComment } from "react-icons/fa";
import { Blog } from "../../payloads/responses/Blog.model";
import { getBlog } from "../../services/BlogService"; // Import hàm getBlog

const itemsPerPage = 8;

function Newest() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBanMenh, setSelectedBanMenh] = useState(""); // State for filter
  const [loading, setLoading] = useState(false);
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await getBlog();
        setBlogs(response.data); // Lấy dữ liệu từ API
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Apply filter based on the selected banMenh
  const filteredBlogs = selectedBanMenh
    ? blogs.filter((blog) => blog.destiny.name === selectedBanMenh)
    : blogs;

  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      py="10"
      mt="10px"
      bg={bgColor}
      w="95%"
      userSelect="none"
    >
      {/* Filter by banMenh */}
      <Flex width="100%">
        <Flex mb={4} justifyContent="flex-start" w="100%">
          <Select
            placeholder="Filter with your destiny"
            value={selectedBanMenh}
            onChange={(e) => setSelectedBanMenh(e.target.value)}
            width="auto"
          >
            <option value="Kim">Kim</option>
            <option value="Mộc">Mộc</option>
            <option value="Thủy">Thủy</option>
            <option value="Hỏa">Hỏa</option>
          </Select>
        </Flex>
      </Flex>

      {/* Display loading indicator */}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Flex
          direction="row"
          wrap="wrap"
          justifyContent="space-between"
          width="100%"
        >
          {currentBlogs.map((blog) => (
            <Box
              key={blog.blogId}
              w={{ base: "full", md: "23%" }}
              mb={4}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow="md"
              borderRadius="lg"
              p={4}
            >
              <Link to={`/newest/${blog.blogId}`}>
                <Image
                  src={
                    blog.blogImg ||
                    "https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png"
                  }
                  alt={blog.blogId.toString()}
                  borderRadius="lg"
                  w="full"
                  h="200px"
                  objectFit="cover"
                />
                <Box pt={4}>
                  <Text fontSize="xl" fontWeight="bold" color={textColor}>
                    {blog.blogId}
                  </Text>
                  <Text fontSize="sm" color={textColor}>
                    {blog.description}
                  </Text>
                </Box>
              </Link>
              <Flex mt={3} justifyContent="space-between" alignItems="center">
                <Flex align="center">
                  <IconButton
                    aria-label="Like"
                    icon={<FaHeart />}
                    colorScheme="red"
                    variant="ghost"
                    size="sm"
                  />
                  <Text ml={1} color={textColor}>
                    {blog.ratings.rating}
                  </Text>
                </Flex>
                <Flex align="center">
                  <IconButton
                    aria-label="Comments"
                    icon={<FaComment />}
                    colorScheme="blue"
                    variant="ghost"
                    size="sm"
                  />
                  <Text ml={1} color={textColor}>
                    {blog.comments.comment}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Flex>
      )}

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
