import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

// Example User Component
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Fetch users from API
  useEffect(() => {
    axios
      .get("/api/users") // Replace with your API endpoint
      .then((response) => setUsers(response.data))
      .catch((error) =>
        toast({
          title: "An error occurred",
          description: error?.response?.data?.message || error.message,
          status: "error",
        })
      );
  }, []);

  // Handle form submission for create and update
  const handleSubmit = async () => {
    const userData = {
      ...currentUser,
      CreateDate: new Date().toISOString(), // or provide the correct format based on your API
      UpdateDate: new Date().toISOString(),
    };

    try {
      if (isEdit) {
        await axios.put(`/api/users/${currentUser.UserID}`, userData); // Update user API endpoint
        toast({ title: "User updated successfully", status: "success" });
      } else {
        await axios.post("/api/users", userData); // Create user API endpoint
        toast({ title: "User created successfully", status: "success" });
      }
      onClose();
      setCurrentUser(null);
      setIsEdit(false);
    } catch (error) {
      toast({ title: "An error occurred", status: "error" });
    }
  };

  // Handle edit
  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEdit(true);
    onOpen();
  };

  // Handle delete
  const handleDelete = async (userID) => {
    try {
      await axios.delete(`/api/users/${userID}`); // Delete user API endpoint
      setUsers(users.filter((user) => user.UserID !== userID));
      toast({ title: "User deleted successfully", status: "success" });
    } catch (error) {
      toast({ title: "An error occurred", status: "error" });
    }
  };

  return (
    <Box p="5">
      <Button colorScheme="blue" onClick={onOpen}>
        Add New User
      </Button>
      <Table variant="simple" mt="4">
        <Thead>
          <Tr>
            <Th>User Code</Th>
            <Th>User Name</Th>
            <Th>Role</Th>
            <Th>Phone</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.UserID}>
              <Td>{user.UserCode}</Td>
              <Td>{user.UserName}</Td>
              <Td>{user.RoleID}</Td>
              <Td>{user.Phone}</Td>
              <Td>{user.IsActive ? "Active" : "Inactive"}</Td>
              <Td>
                <Button
                  onClick={() => handleEdit(user)}
                  colorScheme="yellow"
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(user.UserID)}
                  colorScheme="red"
                  size="sm"
                  ml="2"
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal for Create/Edit User */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? "Edit User" : "Add New User"}</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>User Code</FormLabel>
              <Input
                value={currentUser?.UserCode || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, UserCode: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>User Name</FormLabel>
              <Input
                value={currentUser?.UserName || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, UserName: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Phone</FormLabel>
              <Input
                value={currentUser?.Phone || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, Phone: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Role</FormLabel>
              <Select
                value={currentUser?.RoleID || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, RoleID: e.target.value })
                }
              >
                <option value={1}>Admin</option>
                <option value={2}>User</option>
                {/* Add other roles */}
              </Select>
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Status</FormLabel>
              <Select
                value={currentUser?.IsActive ? "active" : "inactive"}
                onChange={(e) =>
                  setCurrentUser({
                    ...currentUser,
                    IsActive: e.target.value === "active",
                  })
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr="3" onClick={handleSubmit}>
              {isEdit ? "Update" : "Create"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserManagement;
