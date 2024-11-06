import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
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

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Xử lý đăng nhập với username và password
    console.log("Logging in with username:", username);
  };

  const handleGoogleLogin = (credentialResponse: any) => {
    const { credential } = credentialResponse;
    console.log("Google login success, token:", credential);

    // Giải mã JWT để lấy thông tin người dùng
    const decodedToken = JSON.parse(atob(credential.split(".")[1]));
    console.log("User Info:", decodedToken);

    // Thông tin người dùng sẽ bao gồm:
    // decodedToken.name - Tên người dùng
    // decodedToken.email - Email của người dùng
    // decodedToken.picture - URL ảnh đại diện của người dùng
    // decodedToken.gender - Giới tính của người dùng (nếu có)
    // decodedToken.birthdate - Ngày sinh của người dùng (nếu có)
  };

  const handleRegister = () => {
    // Điều hướng đến trang đăng ký
    console.log("Navigate to Register");
  };

  return (
    <GoogleOAuthProvider clientId="654801886438-jigon4nh7ji7mmbi9aghbr5rec9j7ece.apps.googleusercontent.com">
      <Flex align="center" justify="center" height="100vh" bg="gray.50">
        <Box width="400px" p="6" boxShadow="md" bg="white" borderRadius="md">
          <Text fontSize="2xl" mb="6" textAlign="center" fontWeight="bold">
            Login
          </Text>
          <FormControl id="username" mb="4">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <Button colorScheme="blue" width="full" onClick={handleLogin} mb="4">
            Login
          </Button>
          <Button
            colorScheme="teal"
            width="full"
            variant="outline"
            onClick={handleRegister}
            mb="4"
          >
            Register
          </Button>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Google login failed")}
          />
        </Box>
      </Flex>
    </GoogleOAuthProvider>
  );
}

export default Login;
