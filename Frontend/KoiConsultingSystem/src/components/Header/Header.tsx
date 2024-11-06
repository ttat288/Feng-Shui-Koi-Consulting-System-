import {
  Avatar,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  SearchIcon,
  BellIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import logo from "../../assets/images/koibloglogo.png";
import CreateBlog from "../Blog/CreateBlog"; // Import component CreateBlog
import { useDisclosure } from "@chakra-ui/react";
import TinhBanMenh from "../TinhBanMenh";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode(); // Lấy colorMode và hàm toggleColorMode từ Chakra UI
  const {
    isOpen: isBlogOpen,
    onOpen: onBlogOpen,
    onClose: onBlogClose,
  } = useDisclosure(); // Modal cho Create Blog
  const {
    isOpen: isTBMOpen,
    onOpen: onTBMOpen,
    onClose: onTBMClose,
  } = useDisclosure(); // Modal cho Tinh Bang Menh

  return (
    <Flex
      height="100px"
      bg={colorMode === "dark" ? "#333" : "#FFFFFF"} // Dùng colorMode để điều chỉnh màu nền
      color={colorMode === "dark" ? "#FFFFFF" : "#000"} // Điều chỉnh màu chữ
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
        <Button variant="link" fontSize="25px" onClick={onTBMOpen}>
          Calculate Destiny
        </Button>
        {/* Khi nhấn Create Blog sẽ mở drawer */}
        <Button variant="link" fontSize="25px" onClick={onBlogOpen}>
          Create Blog
        </Button>
      </Flex>
      <TinhBanMenh isOpen={isTBMOpen} onClose={onTBMClose} />

      <Spacer />

      {/* Search Bar */}
      <InputGroup width="300px" mr="20px">
        <InputLeftElement
          pointerEvents="none"
          children={
            <SearchIcon
              color={colorMode === "dark" ? "#bbb" : "#888"}
              marginTop="10px"
            />
          }
        />
        <Input
          placeholder="Search..."
          size="lg"
          borderRadius="full"
          pl="40px" // Added left padding to ensure the icon doesn't overlap the input text
          bg={colorMode === "dark" ? "#555" : "#f1f1f1"} // Màu nền input theo chế độ màu
          borderColor={colorMode === "dark" ? "#444" : "#ccc"} // Màu viền input theo chế độ màu
          _focus={{ borderColor: "#4A90E2" }} // Highlight color when focused
        />
      </InputGroup>

      {/* Notifications Icon */}
      <IconButton
        icon={<BellIcon />}
        aria-label="Notifications"
        variant="link"
        fontSize="25px"
        mr="20px"
      />

      {/* Dark Mode Toggle */}
      <IconButton
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />} // Đổi biểu tượng giữa mặt trời và mặt trăng
        aria-label="Toggle Dark Mode"
        variant="link"
        fontSize="25px"
        onClick={toggleColorMode} // Khi nhấn sẽ chuyển đổi giữa sáng và tối
        mr="20px"
      />

      {/* Avatar with dropdown menu */}
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="link">
          <Avatar src="/path-to-avatar.png" height="50px" width="50px" />
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
