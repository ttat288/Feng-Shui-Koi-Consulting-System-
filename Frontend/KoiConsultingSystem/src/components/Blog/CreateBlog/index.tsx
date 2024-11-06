import React, { useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Textarea,
  useDisclosure,
  Select,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import ReactQuill from "react-quill"; // Text Editor
import "react-quill/dist/quill.snow.css"; // Import styles for editor

interface CreateBlogProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateBlog({ isOpen, onClose }: CreateBlogProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    imgURL: "",
    createDate: new Date().toISOString().split("T")[0], // Set create date to current date
    content: "",
    selectedMien: [] as string[], // Chọn các bảng mệnh liên quan
  });

  const handleNextTab = () => {
    if (activeTab < 2) {
      setActiveTab(activeTab + 1);
    }
  };

  const handlePrevTab = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const handleCreateBlog = () => {
    console.log(blogData); // Log the blog data when create button is clicked
  };

  const handleSelectMien = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setBlogData({ ...blogData, selectedMien: options });
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create your Blog</DrawerHeader>

        <DrawerBody>
          <Tabs index={activeTab} onChange={(index) => setActiveTab(index)}>
            <TabList>
              <Tab>Step 1</Tab>
              <Tab>Step 2</Tab>
              <Tab>Step 3</Tab>
            </TabList>

            <TabPanels>
              {/* Step 1 */}
              <TabPanel>
                <Box mb={4}>
                  <Input
                    placeholder="Blog Title"
                    value={blogData.title}
                    onChange={(e) =>
                      setBlogData({ ...blogData, title: e.target.value })
                    }
                  />
                </Box>
                <Box mb={4}>
                  <Textarea
                    placeholder="Blog Description"
                    value={blogData.description}
                    onChange={(e) =>
                      setBlogData({ ...blogData, description: e.target.value })
                    }
                  />
                </Box>
                <Box mb={4}>
                  <Input
                    placeholder="Blog Image URL"
                    value={blogData.imgURL}
                    onChange={(e) =>
                      setBlogData({ ...blogData, imgURL: e.target.value })
                    }
                  />
                </Box>
                <Box mb={4}>
                  <Input isReadOnly value={blogData.createDate} />
                </Box>
                <Button onClick={handleNextTab}>Next</Button>
              </TabPanel>

              {/* Step 2 - Text Editor */}
              <TabPanel>
                <Box mb={4}>
                  <ReactQuill
                    value={blogData.content}
                    onChange={(value) =>
                      setBlogData({ ...blogData, content: value })
                    }
                    modules={{
                      toolbar: [
                        ["bold", "italic", "underline"],
                        [{ list: "ordered" }, { list: "bullet" }],
                      ],
                    }}
                    style={{ height: "300px" }}
                  />
                </Box>
                <Button onClick={handlePrevTab} mr={3}>
                  Back
                </Button>
                <Button onClick={handleNextTab}>Next</Button>
              </TabPanel>

              {/* Step 3 - Select Mien */}
              <TabPanel>
                <Box mb={4}>
                  <Select
                    //isMulti
                    value={blogData.selectedMien}
                    onChange={handleSelectMien}
                    placeholder="Select related Mien"
                  >
                    <option value="Mien 1">Mien 1</option>
                    <option value="Mien 2">Mien 2</option>
                    <option value="Mien 3">Mien 3</option>
                    {/* Add more options as needed */}
                  </Select>
                </Box>
                <Button onClick={handlePrevTab} mr={3}>
                  Back
                </Button>
                <Button onClick={handleCreateBlog}>Create</Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>

        <DrawerFooter>{/* Footer actions */}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CreateBlog;
