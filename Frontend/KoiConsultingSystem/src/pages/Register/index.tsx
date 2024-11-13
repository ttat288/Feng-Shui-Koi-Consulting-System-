import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  RadioGroup,
  Radio,
  Stack,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";
import { createUser } from "../../services/UserService";
import { UserForm } from "../../models/UserForm.model";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [user, setUser] = useState<UserForm>({
    userName: { value: "", errorMessage: "" },
    userPassword: { value: "", errorMessage: "" },
    fullname: { value: "", errorMessage: "" },
    phone: { value: "", errorMessage: "" },
    dob: { value: new Date(), errorMessage: "" },
    gender: { value: "", errorMessage: "" },
  });

  const navigate = useNavigate();

  const handleInputChange = (field: keyof UserForm, value: string | Date) => {
    setUser((prev) => ({
      ...prev,
      [field]: { value, errorMessage: "" },
    }));
  };

  const handleRegister = async () => {
    const roleId = 2;

    const { status, message } = await createUser(user, roleId);

    if (status === 200) {
      toast.success("Registration successful.", {
        position: "top-right", // Positioning the toast at the top-right corner
        autoClose: 5000, // Duration in milliseconds (5 seconds)
        hideProgressBar: false, // Show the progress bar
        progress: undefined, // Automatically progress based on autoClose
      });
    } else {
      // If message is an array of errors, show each error in a separate toast
      if (Array.isArray(message)) {
        message.forEach((error: string) => {
          toast.error(error, {
            position: "top-right", // Positioning the toast at the top-right corner
            autoClose: 5000, // Duration in milliseconds (5 seconds)
            hideProgressBar: false, // Show the progress bar
            progress: undefined, // Automatically progress based on autoClose
          });
        });
      } else {
        // If it's a single message, show it in a single toast
        toast.error(message, {
          position: "top-right", // Positioning the toast at the top-right corner
          autoClose: 5000, // Duration in milliseconds (5 seconds)
          hideProgressBar: false, // Show the progress bar
          progress: undefined, // Automatically progress based on autoClose
        });
      }
    }
  };

  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const buttonBg = useColorModeValue("teal.500", "teal.300");
  const buttonHoverBg = useColorModeValue("teal.600", "teal.400");

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      width="100%"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box width="400px" p="6" boxShadow="md" bg={bgColor} borderRadius="md">
        <Text
          fontSize="2xl"
          mb="6"
          textAlign="center"
          fontWeight="bold"
          color={textColor}
        >
          Register
        </Text>

        <FormControl
          id="userName"
          mb="4"
          isInvalid={!!user.userName.errorMessage}
        >
          <FormLabel color={textColor}>Username</FormLabel>
          <Input
            type="text"
            value={user.userName.value}
            onChange={(e) => handleInputChange("userName", e.target.value)}
            color={textColor}
          />
          <FormErrorMessage>{user.userName.errorMessage}</FormErrorMessage>
        </FormControl>

        <FormControl
          id="userPassword"
          mb="4"
          isInvalid={!!user.userPassword.errorMessage}
        >
          <FormLabel color={textColor}>Password</FormLabel>
          <Input
            type="password"
            value={user.userPassword.value}
            onChange={(e) => handleInputChange("userPassword", e.target.value)}
            color={textColor}
          />
          <FormErrorMessage>{user.userPassword.errorMessage}</FormErrorMessage>
        </FormControl>

        <FormControl
          id="fullname"
          mb="4"
          isInvalid={!!user.fullname.errorMessage}
        >
          <FormLabel color={textColor}>Fullname</FormLabel>
          <Input
            type="text"
            value={user.fullname.value}
            onChange={(e) => handleInputChange("fullname", e.target.value)}
            color={textColor}
          />
          <FormErrorMessage>{user.fullname.errorMessage}</FormErrorMessage>
        </FormControl>

        <FormControl id="phone" mb="4" isInvalid={!!user.phone.errorMessage}>
          <FormLabel color={textColor}>Phone</FormLabel>
          <Input
            type="text"
            value={user.phone.value}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            color={textColor}
          />
          <FormErrorMessage>{user.phone.errorMessage}</FormErrorMessage>
        </FormControl>

        <FormControl id="dob" mb="4" isInvalid={!!user.dob.errorMessage}>
          <FormLabel color={textColor}>Date of Birth</FormLabel>
          <Input
            type="date"
            value={user.dob.value.toISOString().split("T")[0]}
            onChange={(e) => handleInputChange("dob", new Date(e.target.value))}
            color={textColor}
          />
          <FormErrorMessage>{user.dob.errorMessage}</FormErrorMessage>
        </FormControl>

        <FormControl id="gender" mb="6" isInvalid={!!user.gender.errorMessage}>
          <FormLabel color={textColor}>Gender</FormLabel>
          <RadioGroup
            onChange={(value) => handleInputChange("gender", value)}
            value={user.gender.value}
            color={textColor}
          >
            <Stack direction="row">
              <Radio value="male" colorScheme="teal">
                Male
              </Radio>
              <Radio value="female" colorScheme="teal">
                Female
              </Radio>
            </Stack>
          </RadioGroup>
          <FormErrorMessage>{user.gender.errorMessage}</FormErrorMessage>
        </FormControl>

        <Button
          bg={buttonBg}
          color="white"
          width="full"
          onClick={handleRegister}
          mb="4"
          _hover={{ bg: buttonHoverBg }}
        >
          Register
        </Button>

        <Button
          variant="link"
          color={buttonBg}
          onClick={() => navigate("/login")}
          width="full"
        >
          Go to Login
        </Button>
      </Box>
    </Flex>
  );
}

export default Register;
