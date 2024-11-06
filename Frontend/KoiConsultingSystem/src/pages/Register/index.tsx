import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Xử lý đăng ký
    console.log("Registering with:", { username, email, password });
  };

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      width="100%"
      bg="gray.50"
    >
      <Box width="400px" p="6" boxShadow="md" bg="white" borderRadius="md">
        <Text fontSize="2xl" mb="6" textAlign="center" fontWeight="bold">
          Register
        </Text>
        <FormControl id="username" mb="4">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" mb="4">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" mb="6">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" width="full" onClick={handleRegister} mb="4">
          Register
        </Button>
      </Box>
    </Flex>
  );
}

export default Register;
