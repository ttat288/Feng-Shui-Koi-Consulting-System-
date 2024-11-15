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
import { useEffect, useState } from "react";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../services/UserService";

// Example User Component
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.isSuccess) {
        setUsers(response.data);
      } else {
        toast({
          title: "Error fetching users",
          description: response.message,
          status: "error",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Unable to fetch users.",
        status: "error",
      });
    }
  };

  // Handle form submission for create and update
  const handleSubmit = async () => {
    const userData = {
      ...currentUser,
      CreateDate: new Date().toISOString(),
      UpdateDate: new Date().toISOString(),
    };

    try {
      if (isEdit) {
        await updateUser(currentUser.UserID, userData);
        toast({ title: "User updated successfully", status: "success" });
      } else {
        await createUser(userData, userData.RoleID); // roleId should be passed as a second parameter
        toast({ title: "User created successfully", status: "success" });
      }
      fetchUsers(); // Refresh users
      onClose();
      setCurrentUser({});
      setIsEdit(false);
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message || "Please try again.",
        status: "error",
      });
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
      await deleteUser(userID); // Delete user API endpoint
      setUsers(users.filter((user) => user.UserID !== userID));
      toast({ title: "User deleted successfully", status: "success" });
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message || "Unable to delete user.",
        status: "error",
      });
    }
  };

  // Open modal for adding new user
  const handleAddNewUser = () => {
    setCurrentUser({}); // Reset currentUser for new user creation
    setIsEdit(false);
    onOpen();
  };

  return (
    <Box p="5">
      <Button colorScheme="blue" onClick={handleAddNewUser}>
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
                value={currentUser.UserCode || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, UserCode: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>User Name</FormLabel>
              <Input
                value={currentUser.UserName || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, UserName: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Phone</FormLabel>
              <Input
                value={currentUser.Phone || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, Phone: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel>Role</FormLabel>
              <Select
                value={currentUser.RoleID || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, RoleID: e.target.value })
                }
              >
                <option value={1}>Admin</option>
                <option value={2}>User</option>
                {/* Add other roles as needed */}
              </Select>
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Status</FormLabel>
              <Select
                value={currentUser.IsActive ? "active" : "inactive"}
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
