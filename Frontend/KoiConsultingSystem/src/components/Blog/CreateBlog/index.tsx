import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Image,
  Divider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BlogEditor from "../BlogEditor";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateBlog: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const [tabIndex, setTabIndex] = useState(0);
  const [categories, setCategories] = useState<{ [key: string]: string[] }>({});
  const [IsActive, setIsActive] = useState(true);
  const [MenuImage, setMenuImage] = useState<File | null>(null);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleNext = () => {
    setTabIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : prevIndex));
  };

  const handlePrevious = () => {
    setTabIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMenuImage(e.target.files[0]);
      setImagePreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Hàm submit
  const handleSubmit = async () => {};

  return (
    <Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tạo bài viết</DrawerHeader>

          <DrawerBody>
            <Flex height="100%" w="100%" flexDirection="column">
              <Flex height="15%" justifyContent="center" alignItems="center">
                {/* Bước 1 */}
                <Flex flexDirection="column" alignItems="center" rowGap="10px">
                  <Text
                    as="b"
                    fontSize={tabIndex === 0 ? "18px" : "16px"}
                    color={tabIndex === 0 ? "#696CFF" : "#ccc"}
                    transition="all 0.3s ease"
                  >
                    Thông tin cơ bản của bài viết
                  </Text>
                  <Flex
                    height={tabIndex === 0 ? "55px" : "50px"}
                    width={tabIndex === 0 ? "55px" : "50px"}
                    bg={
                      tabIndex === 0
                        ? "linear-gradient(45deg, #696CFF, #FC5DD2)"
                        : "#ccc"
                    }
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="30px"
                    transition="all 0.3s ease"
                  >
                    <Text as="b" color={tabIndex === 0 ? "#fff" : "#000"}>
                      1
                    </Text>
                  </Flex>
                </Flex>

                <Box
                  marginTop="20px"
                  height="2px"
                  width="20%"
                  bg="linear-gradient(45deg, #696CFF, #FC5DD2)"
                />

                {/* Bước 2 */}
                <Flex flexDirection="column" alignItems="center" rowGap="10px">
                  <Text
                    as="b"
                    fontSize={tabIndex === 1 ? "18px" : "16px"}
                    color={tabIndex === 1 ? "#696CFF" : "#ccc"}
                    transition="all 0.3s ease"
                  >
                    Nội dung của bài viết
                  </Text>
                  <Flex
                    height={tabIndex === 1 ? "55px" : "50px"}
                    width={tabIndex === 1 ? "55px" : "50px"}
                    bg={
                      tabIndex === 1
                        ? "linear-gradient(45deg, #696CFF, #FC5DD2)"
                        : "#ccc"
                    }
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="30px"
                    transition="all 0.3s ease"
                  >
                    <Text as="b" color={tabIndex === 1 ? "#fff" : "#000"}>
                      2
                    </Text>
                  </Flex>
                </Flex>

                <Box
                  marginTop="20px"
                  height="2px"
                  width="20%"
                  bg="linear-gradient(45deg, #696CFF, #FC5DD2)"
                />

                {/* Bước 3 */}
                <Flex flexDirection="column" alignItems="center" rowGap="10px">
                  <Text
                    as="b"
                    fontSize={tabIndex === 2 ? "18px" : "16px"}
                    color={tabIndex === 2 ? "#696CFF" : "#ccc"}
                    transition="all 0.3s ease"
                  >
                    Xác nhận và hoàn tất
                  </Text>
                  <Flex
                    height={tabIndex === 2 ? "55px" : "50px"}
                    width={tabIndex === 2 ? "55px" : "50px"}
                    bg={
                      tabIndex === 2
                        ? "linear-gradient(45deg, #696CFF, #FC5DD2)"
                        : "#ccc"
                    }
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="30px"
                    transition="all 0.3s ease"
                  >
                    <Text as="b" color={tabIndex === 2 ? "#fff" : "#000"}>
                      3
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex height="85%" justifyContent="center">
                <Tabs
                  index={tabIndex}
                  onChange={(index) => setTabIndex(index)}
                  isFitted
                  variant="enclosed"
                >
                  <TabPanels>
                    <TabPanel>
                      <Flex
                        width="500px"
                        padding="10px"
                        flexDirection="column"
                        rowGap="15px"
                      >
                        <Text fontSize="18px">Tiêu đề</Text>
                        <Input value={Title} onChange={handleTitleChange} />
                        {Title.length > 50 && (
                          <Text color="yellow.500" fontSize="14px">
                            Nếu vượt quá 50 ký tự, chữ thừa sẽ được thay thành
                            ...
                          </Text>
                        )}

                        <Text fontSize="18px">Mô tả</Text>
                        <Input
                          value={Description}
                          onChange={handleDescriptionChange}
                        />
                        {Description.length > 100 && (
                          <Text color="yellow.500" fontSize="14px">
                            Nếu vượt quá 100 ký tự, chữ thừa sẽ được thay thành
                            ...
                          </Text>
                        )}
                        <Text fontSize="18px">Ảnh nền bài viết</Text>
                        <Input
                          type="file"
                          accept=".jpeg, .jpg, .png"
                          padding="5px"
                          onChange={handleFileChange}
                        />

                        <Text fontSize="18px">Ngày tạo</Text>
                        <Input value={currentDate} isReadOnly />
                      </Flex>
                    </TabPanel>
                    <TabPanel>
                      <Flex
                        width="70vw"
                        padding="10px"
                        flexDirection="column"
                        rowGap="15px"
                      >
                        <BlogEditor
                          content={content}
                          onContentChange={handleContentChange}
                        />
                      </Flex>
                    </TabPanel>
                    <TabPanel>
                      <Flex
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        rowGap="20px"
                      >
                        <Text fontSize="18px" fontWeight="600">
                          Xem trước thẻ bài viết
                        </Text>
                        <Flex
                          height="300px"
                          width="250px"
                          padding="10px"
                          flexDirection="column"
                          borderRadius="10px"
                          marginTop="20px"
                          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                        >
                          {imagePreviewUrl && (
                            <Image
                              src={imagePreviewUrl}
                              alt="Ảnh nền bài viết"
                              height="120px"
                              borderRadius="10px"
                            />
                          )}
                          <Text marginTop="20px" fontSize="18px" as="b">
                            {Title}
                          </Text>
                          <Text color="#BCC0C3">{Description}</Text>
                        </Flex>
                        <Divider
                          borderColor="teal.500"
                          borderWidth={2}
                          orientation="horizontal"
                          my={6}
                          width="80vw"
                        />
                        <Text fontSize="18px" fontWeight="600">
                          Nội dung:
                        </Text>
                        <Box
                          width="80vw"
                          mb="4"
                          dangerouslySetInnerHTML={{ __html: content }}
                        />
                      </Flex>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Flex>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={handlePrevious}
              isDisabled={tabIndex === 0}
            >
              Previous
            </Button>
            {tabIndex === 2 ? (
              <Button colorScheme="blue" onClick={handleSubmit}>
                Tạo
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={handleNext}>
                Next
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default CreateBlog;
