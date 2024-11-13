import React, { useState } from "react";
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
import { FaHeart, FaComment } from "react-icons/fa"; // Import icon

const blogs = [
  {
    id: 1,
    title: "Blog Name 1",
    description:
      "Discover the best plants to bring balance and harmony into your home",
    imageUrl:
      "https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png",
    body: "Here is the full content of the blog post.",
    likes: 24,
    comments: 10,
    banMenh: "Kim",
  },
  {
    id: 2,
    title: "Blog Name 2",
    description:
      "Discover the best plants to bring balance and harmony into your home",
    imageUrl:
      "https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png",
    body: "Here is the full content of the blog post.",
    likes: 35,
    comments: 8,
    banMenh: "Mộc",
  },
  {
    id: 3,
    title: "Blog Name 3",
    description:
      "Discover the best plants to bring balance and harmony into your home",
    imageUrl:
      "https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png",
    body: "Here is the full content of the blog post.",
    likes: 12,
    comments: 4,
    banMenh: "Thủy",
  },
  {
    id: 4,
    title: "Blog Name 4",
    description:
      "Discover the best plants to bring balance and harmony into your home",
    imageUrl:
      "https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png",
    body: "Here is the full content of the blog post.",
    likes: 18,
    comments: 6,
    banMenh: "Hỏa",
  },
  {
    id: 4,
    title: "Blog Name 5",
    description:
      "Discover the best plants to bring balance and harmony into your home",
    imageUrl:
      "https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png",
    body: "Here is the full content of the blog post.",
    likes: 18,
    comments: 6,
    banMenh: "Hỏa",
  },
  {
    id: 4,
    title: "Blog Name 6",
    description:
      "Discover the best plants to bring balance and harmony into your home",
    imageUrl:
      "https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png",
    body: "Here is the full content of the blog post.",
    likes: 18,
    comments: 6,
    banMenh: "Hỏa",
  },
  {
    id: 4,
    title: "Blog Name 7",
    description:
      "Discover the best plants to bring balance and harmony into your home",
    imageUrl:
      "https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png",
    body: "Here is the full content of the blog post.",
    likes: 18,
    comments: 6,
    banMenh: "Hỏa",
  },
];

const itemsPerPage = 8;

function Newest() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBanMenh, setSelectedBanMenh] = useState(""); // State for filter
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Apply filter based on the selected banMenh
  const filteredBlogs = selectedBanMenh
    ? blogs.filter((blog) => blog.banMenh === selectedBanMenh)
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

      <Flex
        direction="row"
        wrap="wrap"
        justifyContent="space-between"
        width="100%"
      >
        {currentBlogs.map((blog) => (
          <Box
            key={blog.id}
            w={{ base: "full", md: "23%" }}
            mb={4}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="md"
            borderRadius="lg"
            p={4}
          >
            <Link to={`/newest/${blog.title}`}>
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
                  {blog.likes}
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
                  {blog.comments}
                </Text>
              </Flex>
            </Flex>
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
