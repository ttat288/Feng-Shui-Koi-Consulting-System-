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
import { getUserById, updateUser } from "../../services/UserService";
import { UpdateUserPayload } from "../../payloads/requests/updateUserRequests.model";

function UserInfo() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | undefined>();
  const [isEditing, setIsEditing] = useState(false);

  const bgColor = useColorModeValue("white", "gray.800");

  const fetchUserInfo = async () => {
    const userId = localStorage.getItem("UserId");

    if (!userId) {
      console.error("UserId not found in localStorage");
      return;
    }

    const fetchedData = await getUserById(Number(userId));
    setUser(fetchedData.isSuccess ? fetchedData.data ?? undefined : undefined);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleGenderChange = (value: string) => {
    setUser((prev) => (prev ? { ...prev, gender: value } : prev));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!user) return;

    const payload: UpdateUserPayload = {
      isActive: user.isActive ?? true,
      fullname: user.fullname ?? "", // Chuyển null thành chuỗi rỗng
      phone: user.phone ?? "", // Chuyển null thành chuỗi rỗng
      dob: {
        year: user.dob ? new Date(user.dob).getFullYear() : 0,
        month: user.dob ? new Date(user.dob).getMonth() + 1 : 0,
        day: user.dob ? new Date(user.dob).getDate() : 0,
        dayOfWeek: user.dob ? new Date(user.dob).getDay() : 0,
      },
      gender: user.gender ?? "", // Chuyển null thành chuỗi rỗng
      updateBy: 0, // Set the user ID of the updater here
    };
    console.log("Payload to update user:", JSON.stringify(payload, null, 2));

    try {
      const response = await updateUser(
        Number(localStorage.getItem("UserId")),
        payload
      );
      if (response.isSuccess) {
        setIsEditing(false);
        console.log("User info updated successfully");
      } else {
        console.error("Failed to update user:", response.message);
      }
    } catch (error) {
      console.error("An error occurred while updating user:", error);
    }
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
            value={user?.fullname || ""}
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
            value={user?.dob || ""}
            onChange={handleChange}
            isReadOnly={!isEditing}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Phone</FormLabel>
          <Input
            name="phone"
            value={user?.phone || ""}
            onChange={handleChange}
            placeholder="Enter your phone number"
            isReadOnly={!isEditing}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            onChange={handleGenderChange}
            value={user?.gender || ""}
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
