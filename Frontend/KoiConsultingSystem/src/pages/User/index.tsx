import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Radio,
  RadioGroup,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    dob: "",
    phone: "",
    gender: "Male",
  });
  const [isEditing, setIsEditing] = useState(false);

  const bgColor = useColorModeValue("white", "gray.800");

  // Function to fetch user data (replace this with actual API call)
  const fetchUserInfo = async () => {
    const fetchedData = {
      fullname: "John Doe",
      dob: "1990-01-01",
      phone: "123456789",
      gender: "Male",
    };
    setUser(fetchedData);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setUser((prev) => ({ ...prev, gender: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Call API to update user info
    console.log("User info saved:", user);
  };

  const handleBackToHome = () => {
    navigate("/"); // Adjust route as needed
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w="100%"
      py="10"
      bg={bgColor}
      borderRadius="md"
      p={8}
      boxShadow="md"
    >
      <Box w="full" maxW="500px">
        <FormControl mb={4}>
          <FormLabel>Full Name</FormLabel>
          <Input
            name="fullname"
            value={user.fullname}
            onChange={handleChange}
            placeholder="Enter your full name"
            isReadOnly={!isEditing}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Date of Birth</FormLabel>
          <Input
            name="dob"
            type="date"
            value={user.dob}
            onChange={handleChange}
            isReadOnly={!isEditing}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Phone</FormLabel>
          <Input
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            isReadOnly={!isEditing}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            onChange={handleGenderChange}
            value={user.gender}
            isDisabled={!isEditing}
          >
            <Stack direction="row">
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <Flex justify="space-between" mt={4}>
          <Button colorScheme="blue" onClick={handleBackToHome}>
            Back to Home
          </Button>
          {isEditing ? (
            <Button colorScheme="teal" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button colorScheme="teal" onClick={handleEdit}>
              Update
            </Button>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}

export default UserInfo;
