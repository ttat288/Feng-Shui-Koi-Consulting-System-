import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Link,
  Text,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";

type TinhBanMenhProps = {
  isOpen: boolean;
  onClose: () => void;
};

function TinhBanMenh({ isOpen, onClose }: TinhBanMenhProps) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);

  const destinyInfo = {
    destiny: "Kim",
    koiFish: "Koi Fish Gold",
    koiImage: "https://example.com/koi-fish-gold.jpg",
    relatedLink: "https://example.com/related-articles",
  };

  const handleNext = () => {
    if (!gender) {
      setGenderError(true);
      return;
    }

    const userData = {
      birthDate: `${day}/${month}/${year}`,
      gender,
    };
    console.log("User Data:", userData);

    onClose();
    setResultOpen(true);
  };

  const closeResult = () => setResultOpen(false);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Calculate Destiny</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Date of Birth</FormLabel>
              <Select
                placeholder="Day"
                onChange={(e) => setDay(e.target.value)}
                mb={2}
              >
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="Month"
                onChange={(e) => setMonth(e.target.value)}
                mb={2}
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="Year"
                onChange={(e) => setYear(e.target.value)}
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isInvalid={genderError}>
              <FormLabel>Gender</FormLabel>
              <Select
                placeholder="Select Gender"
                onChange={(e) => {
                  setGender(e.target.value);
                  setGenderError(false);
                }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
              {genderError && (
                <FormErrorMessage>Gender is required.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleNext}>
              Calculate Destiny
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={resultOpen} onClose={closeResult}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Congratulations on Your Destiny!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Congratulations! You belong to the <b>{destinyInfo.destiny}</b>{" "}
              destiny.
            </Text>
            <Text>
              The suitable Koi fish for you is: <b>{destinyInfo.koiFish}</b>
            </Text>
            <Image
              src={destinyInfo.koiImage}
              alt="Suitable Koi Fish"
              boxSize="200px"
              mt={4}
              borderRadius="md"
            />
            <Link
              href={destinyInfo.relatedLink}
              color="blue.500"
              mt={4}
              isExternal
            >
              View related articles
            </Link>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeResult}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TinhBanMenh;
