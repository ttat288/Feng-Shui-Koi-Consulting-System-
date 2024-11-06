import {
  Avatar,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import logo from "../../assets/images/koibloglogo.png";
import CreateBlog from "../Blog/CreateBlog"; // Import component CreateBlog
import { useDisclosure } from "@chakra-ui/react";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal cho TinhBanMenh
  const {
    isOpen: isBlogOpen,
    onOpen: onBlogOpen,
    onClose: onBlogClose,
  } = useDisclosure(); // Modal cho Create Blog

  return (
    <Flex
      height="100px"
      bg="#FFFFFF"
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      alignItems="center"
      px="20px"
    >
      {/* Logo on the left */}
      <Image src={logo} alt="Logo" height="100%" />

      {/* Navigation links */}
      <Flex ml="100px" gap="50px">
        <Button variant="link" fontSize="25px">
          Blog
        </Button>
        <Button variant="link" fontSize="25px">
          Calculate Destiny
        </Button>
        {/* Khi nhấn Create Blog sẽ mở drawer */}
        <Button variant="link" fontSize="25px" onClick={onBlogOpen}>
          Create Blog
        </Button>
      </Flex>

      <Spacer />

      {/* Avatar with dropdown menu */}
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="link">
          <Avatar src="/path-to-avatar.png" height="60px" width="60px" />
        </MenuButton>
        <MenuList>
          <MenuItem>User Info</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>

      {/* Drawer cho Create Blog */}
      <CreateBlog isOpen={isBlogOpen} onClose={onBlogClose} />
    </Flex>
  );
}

export default Header;
