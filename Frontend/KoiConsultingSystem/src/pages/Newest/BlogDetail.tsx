import React from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Text, Image, Button, Flex } from "@chakra-ui/react";

// Ví dụ về dữ liệu blog
const blogs = [
  {
    id: 1,
    title: "Blog Name 1",
    description:
      "Discover the best plants to bring balance and harmony into your home",
    imageUrl:
      "https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png",
    body: "Here is the full content of the blog post.",
  },
  {
    id: 1,
    title: "Blog Name 2",
    description:
      "Discover the best plants to bring balance and harmony into your home",
    imageUrl:
      "https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png",
    body: `
      Plants have a unique ability to transform any indoor space, adding not only beauty but also a sense of calm and balance.
      Adding greenery to your home is one of the easiest ways to boost your well-being. Indoor plants have been shown to 
      improve air quality, increase productivity, and even reduce stress levels.
      
      ### Why Indoor Plants?
      Having indoor plants brings multiple benefits. Not only do they purify the air by filtering out toxins, but they also add
      a visual connection to nature, which has been shown to enhance mood and mental clarity. Indoor plants can make your home feel
      fresher, cleaner, and more inviting. 

      ### Top Plants for Indoor Balance
      - **Snake Plant**: Known for its ability to filter indoor air, this plant is also incredibly easy to care for.
      - **Peace Lily**: This plant is not only beautiful but also helps to remove pollutants like ammonia and formaldehyde.
      - **Spider Plant**: Perfect for beginners, spider plants are resilient and known for their air-purifying properties.
      - **Aloe Vera**: Not only great for skin care, but Aloe Vera also purifies the air and is low-maintenance.

      ### How to Care for Indoor Plants
      Taking care of indoor plants is easier than it may seem. Make sure to provide adequate sunlight, avoid overwatering, 
      and occasionally wipe the leaves to remove dust. Regularly rotate your plants to ensure all sides receive light, 
      and use natural fertilizers to support growth.

      Plants not only add a touch of nature indoors but also bring a sense of balance and tranquility into any space. With just 
      a little care, your home can be transformed into a green oasis!
    `,
  },
  {
    id: 1,
    title: "Blog Name 3",
    description:
      "Discover the best plants to bring balance and harmony into your home",
    imageUrl:
      "https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png",
    body: "Here is the full content of the blog post.",
  },
  {
    id: 1,
    title: "Blog Name 4",
    description:
      "Discover the best plants to bring balance and harmony into your home",
    imageUrl:
      "https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png",
    body: `
      Plants have a unique ability to transform any indoor space, adding not only beauty but also a sense of calm and balance.
      Adding greenery to your home is one of the easiest ways to boost your well-being. Indoor plants have been shown to 
      improve air quality, increase productivity, and even reduce stress levels.
      
      ### Why Indoor Plants?
      Having indoor plants brings multiple benefits. Not only do they purify the air by filtering out toxins, but they also add
      a visual connection to nature, which has been shown to enhance mood and mental clarity. Indoor plants can make your home feel
      fresher, cleaner, and more inviting. 

      ### Top Plants for Indoor Balance
      - **Snake Plant**: Known for its ability to filter indoor air, this plant is also incredibly easy to care for.
      - **Peace Lily**: This plant is not only beautiful but also helps to remove pollutants like ammonia and formaldehyde.
      - **Spider Plant**: Perfect for beginners, spider plants are resilient and known for their air-purifying properties.
      - **Aloe Vera**: Not only great for skin care, but Aloe Vera also purifies the air and is low-maintenance.

      ### How to Care for Indoor Plants
      Taking care of indoor plants is easier than it may seem. Make sure to provide adequate sunlight, avoid overwatering, 
      and occasionally wipe the leaves to remove dust. Regularly rotate your plants to ensure all sides receive light, 
      and use natural fertilizers to support growth.

      Plants not only add a touch of nature indoors but also bring a sense of balance and tranquility into any space. With just 
      a little care, your home can be transformed into a green oasis!
    `,
  },
  // Thêm các bài blog khác nếu cần
];

function BlogDetail() {
  const { title } = useParams(); // Lấy title từ URL
  const blog = blogs.find((b) => b.title === title); // Tìm blog theo title

  if (!blog) {
    return <Text>Blog not found!</Text>; // Nếu không tìm thấy blog
  }

  return (
    <Box p={6}>
      <Image
        src={blog.imageUrl}
        alt={blog.title}
        borderRadius="lg"
        w="full"
        h="300px"
        objectFit="cover"
      />
      <Text fontSize="3xl" fontWeight="bold" mt={4}>
        {blog.title}
      </Text>
      <Text fontSize="lg" mt={4}>
        {blog.body}
      </Text>

      <Text fontSize="xl" fontWeight="bold" mt={6}>
        Related Blogs
      </Text>
      <Flex
        direction="row"
        wrap="wrap"
        justifyContent="space-between"
        width="100%"
      >
        {/* Hiển thị 4 blog liên quan */}
        {blogs.slice(0, 4).map((relatedBlog) => (
          <Box
            key={relatedBlog.id}
            w={{ base: "full", md: "23%" }}
            mb={4}
            p={4}
          >
            <Link to={`/newest/${relatedBlog.title}`}>
              <Image
                src={relatedBlog.imageUrl}
                alt={relatedBlog.title}
                borderRadius="lg"
                w="full"
                h="200px"
                objectFit="cover"
              />
              <Text fontSize="xl" fontWeight="bold" mt={2}>
                {relatedBlog.title}
              </Text>
            </Link>
          </Box>
        ))}
      </Flex>

      <Button as={Link} to="/" colorScheme="blue" mt={4}>
        Back to Blogs
      </Button>
    </Box>
  );
}

export default BlogDetail;
