import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Link as ChakraLink,
  Image,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { login, LoginWithGoogle } from "../../services/AuthenticationService";
import LoadingFish from "../../assets/gif/fish.gif";
import { toast } from "react-toastify";
import { UserRole } from "../../constants/Enum";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  let flag = false;

  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const buttonBg = useColorModeValue("teal.500", "teal.300");
  const buttonHoverBg = useColorModeValue("teal.600", "teal.400");

  useEffect(() => {
    if (location.state?.toastMessage && !flag) {
      toast.error(location.state.toastMessage, {
        autoClose: 2500,
      });
      flag = true;
    }
  }, [location.state]);

  useEffect(() => {
    const roleId = localStorage.getItem("RoleId");
    const isLoggedIn =
      localStorage.getItem("AccessToken") !== null &&
      localStorage.getItem("RefreshToken") !== null;
    if (isLoggedIn && roleId !== null) {
      if (roleId.toString() === UserRole.Admin.toString()) {
        navigate("/");
      }
      if (roleId.toString() === UserRole.Member.toString()) {
        navigate("/");
      }
    }
  });

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      loginHandler();
    }
  };

  const loginHandler = async () => {
    if (!credentials.username || !credentials.password) {
      toast.error("Vui lòng nhập tài khoản và mật khẩu");
      return;
    }
    try {
      setIsLoading(true);
      const response = await login(credentials.username, credentials.password);
      console.log(response);

      if (response.statusCode === 200) {
        localStorage.setItem("RoleId", response.data.roleId.toString());
        localStorage.setItem("AccessToken", response.data.token.accessToken);
        localStorage.setItem("RefreshToken", response.data.token.refreshToken);
        const toastMessage = response.message;

        if (response.data.roleId.toString() === UserRole.Admin.toString()) {
          localStorage.setItem("UserId", response.data.userId.toString());
          navigate("/", { state: { toastMessage } });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    const { credential } = credentialResponse;
    try {
      setIsLoading(true);
      const decodedToken = JSON.parse(atob(credential.split(".")[1]));
      const a = decodedToken.email;

      const response = await LoginWithGoogle(a);

      if (response.statusCode === 200) {
        localStorage.setItem("RoleId", response.data.roleId.toString());
        localStorage.setItem("AccessToken", response.data.token.accessToken);
        localStorage.setItem("RefreshToken", response.data.token.refreshToken);
        const toastMessage = response.message;

        if (response.data.roleId.toString() === UserRole.Admin.toString()) {
          localStorage.setItem("UserId", response.data.userId.toString());
          navigate("/", { state: { toastMessage } });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Flex height="50.5vw" width="100%" justifyContent="center" bg="gray.700">
        <Image src={LoadingFish} />
      </Flex>
    );
  }

  return (
    <GoogleOAuthProvider clientId="654801886438-jigon4nh7ji7mmbi9aghbr5rec9j7ece.apps.googleusercontent.com">
      <Flex
        align="center"
        justify="center"
        height="100vh"
        bg={useColorModeValue("gray.50", "gray.800")}
        width="100%"
      >
        <Box width="400px" p="6" boxShadow="md" bg={bgColor} borderRadius="md">
          <Text
            fontSize="2xl"
            mb="6"
            textAlign="center"
            fontWeight="bold"
            color={textColor}
          >
            Login
          </Text>
          <FormControl id="username" mb="4">
            <FormLabel color={textColor}>Username</FormLabel>
            <Input
              name="username"
              type="text"
              value={credentials.username}
              onChange={handleChange}
              color={textColor}
            />
          </FormControl>
          <FormControl id="password" mb="6">
            <FormLabel color={textColor}>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                color={textColor}
              />
              <InputRightElement width="4.5rem">
                <Button
                  bg="gray.600"
                  h="1.75rem"
                  size="sm"
                  onClick={handleShowClick}
                  color="white"
                  _hover={{ bg: "gray.700" }}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            bg={buttonBg}
            color="white"
            width="full"
            onClick={loginHandler}
            mb="4"
            _hover={{ bg: buttonHoverBg }}
          >
            Login
          </Button>

          <ChakraLink
            as={ReactRouterLink}
            to="/register"
            style={{ textDecoration: "none", transition: "0.3s" }}
          >
            <Button colorScheme="teal" width="full" variant="outline" mb="4">
              Register
            </Button>
          </ChakraLink>
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
