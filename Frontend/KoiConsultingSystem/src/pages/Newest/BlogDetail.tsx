import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  Button,
  Flex,
  IconButton,
  Input,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

// Sample blog data
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
    id: 2,
    title: "Blog Name 2",
    description: "How to care for your indoor plants effectively",
    imageUrl:
      "https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png",
    body: `
      Plants have a unique ability to transform any indoor space, adding not only beauty but also a sense of calm and balance.
      Adding greenery to your home is one of the easiest ways to boost your well-being. Indoor plants have been shown to improve air quality, increase productivity, and even reduce stress levels.
      
      ### Why Indoor Plants?
      Having indoor plants brings multiple benefits. Not only do they purify the air by filtering out toxins, but they also add a visual connection to nature, which has been shown to enhance mood and mental clarity. Indoor plants can make your home feel fresher, cleaner, and more inviting.
      
      ### Top Plants for Indoor Balance
      - **Snake Plant**: Known for its ability to filter indoor air, this plant is also incredibly easy to care for.
      - **Peace Lily**: This plant is not only beautiful but also helps to remove pollutants like ammonia and formaldehyde.
      - **Spider Plant**: Perfect for beginners, spider plants are resilient and known for their air-purifying properties.
      - **Aloe Vera**: Not only great for skin care, but Aloe Vera also purifies the air and is low-maintenance.
      
      ### How to Care for Indoor Plants
      Taking care of indoor plants is easier than it may seem. Make sure to provide adequate sunlight, avoid overwatering, and occasionally wipe the leaves to remove dust. Regularly rotate your plants to ensure all sides receive light, and use natural fertilizers to support growth.

      Plants not only add a touch of nature indoors but also bring a sense of balance and tranquility into any space. With just a little care, your home can be transformed into a green oasis!
      
      #### Additional Tips
      - Consider using plants like **Ficus** and **Rubber Plant** for larger spaces.
      - If you're short on space, try vertical gardening with plants like **Pothos** and **English Ivy**.
      - Remember that some plants like **Cacti** and **Succulents** thrive in dry environments and require minimal watering.

      ### Conclusion
      By incorporating more indoor plants into your living space, you’re not only beautifying your home but also creating an environment that promotes well-being, productivity, and mental clarity. Start small and gradually add new plants to see the transformative effects they have on your space.
    `,
  },
  {
    id: 3,
    title: "Blog Name 3",
    description: "How to care for your indoor plants effectively",
    imageUrl:
      "https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png",
    body: "Detailed guide on indoor plant care.",
  },
  {
    id: 4,
    title: "Blog Name 4",
    description: "How to care for your indoor plants effectively",
    imageUrl:
      "https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png",
    body: "Detailed guide on indoor plant care.",
  },
];

// Type for comment data
type Comment = {
  name: string;
  content: string;
  timestamp: string;
};

// BlogDetail component
function BlogDetail() {
  const { title } = useParams<{ title: string }>();
  const blog = blogs.find((b) => b.title === title);

  const [likes, setLikes] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [commenterName, setCommenterName] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([
    {
      name: "Alice",
      content: "Great blog post!",
      timestamp: new Date().toLocaleString(),
    },
    {
      name: "Bob",
      content: "Very informative, thanks!",
      timestamp: new Date().toLocaleString(),
    },
  ]);

  const handleLike = () => setLikes((prevLikes) => prevLikes + 1);

  const handleCommentSubmit = () => {
    if (comment.trim() && commenterName.trim()) {
      setComments([
        ...comments,
        {
          name: commenterName,
          content: comment,
          timestamp: new Date().toLocaleString(),
        },
      ]);
      setComment("");
      setCommenterName("");
    }
  };

  if (!blog) return <Text>Blog not found!</Text>;

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

      <Flex mt={6} align="center">
        <IconButton
          icon={<FaHeart />}
          colorScheme="red"
          onClick={handleLike}
          aria-label="Like"
          mr={2}
        />
        <Text>{likes} Likes</Text>
      </Flex>

      <Box mt={8}>
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          Comments
        </Text>
        <Input
          placeholder="Your Name"
          value={commenterName}
          onChange={(e) => setCommenterName(e.target.value)}
          mb={2}
        />
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          size="sm"
          mb={4}
        />
        <Button onClick={handleCommentSubmit} colorScheme="teal">
          Submit Comment
        </Button>

        {comments.length > 0 && (
          <Box mt={6}>
            {comments.map((c, index) => (
              <Box
                key={index}
                bg={useColorModeValue("gray.100", "gray.700")}
                p={3}
                borderRadius="md"
                mt={2}
              >
                <Text fontWeight="bold">{c.name}</Text>
                <Text fontSize="sm" color="gray.500">
                  {c.timestamp}
                </Text>
                <Text>{c.content}</Text>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Related Blogs Section */}
      <Text fontSize="xl" fontWeight="bold" mt={10}>
        Related Blogs
      </Text>
      <Flex
        direction="row"
        wrap="wrap"
        justifyContent="space-between"
        width="100%"
      >
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
