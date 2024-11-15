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
  Select,
  Text,
  Image,
  VStack,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { calculateDestiny } from "../../services/DestinyService";

type TinhBanMenhProps = {
  isOpen: boolean;
  onClose: () => void;
};

function TinhBanMenh({ isOpen, onClose }: TinhBanMenhProps) {
  const [year, setYear] = useState("");
  const [resultOpen, setResultOpen] = useState(false);
  const [destinyData, setDestinyData] = useState<DestinyResponse | null>(null);

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleCalculateDestiny = async () => {
    if (!year) return;

    try {
      const response = await calculateDestiny(parseInt(year));
      setDestinyData(response.destinyData);
      setResultOpen(true);
    } catch (error) {
      console.error("Error calculating destiny:", error);
    }
  };

  const closeResult = () => setResultOpen(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Calculate Destiny</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Year of Birth</FormLabel>
              <Select
                placeholder="Select Year"
                onChange={(e) => setYear(e.target.value)}
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleCalculateDestiny}>
              Calculate Destiny
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={resultOpen} onClose={closeResult}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Destiny</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {destinyData && (
              <>
                <Text>
                  You belong to the <b>{destinyData.destinyId.destinyName}</b>{" "}
                  destiny.
                </Text>

                <VStack align="start" spacing={4} mt={4}>
                  <Text fontWeight="bold">Koi Fish List:</Text>
                  {destinyData.destinyId.koiFishList.map((fish) => (
                    <Box
                      key={fish.fishId}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                    >
                      <Text fontWeight="bold">{fish.fishName}</Text>
                      <Text>{fish.description}</Text>
                      {fish.imgUrl && (
                        <Image
                          src={fish.imgUrl}
                          alt={fish.fishName}
                          boxSize="100px"
                          mt={2}
                        />
                      )}
                    </Box>
                  ))}

                  <Text fontWeight="bold" mt={4}>
                    Fish Pond List:
                  </Text>
                  {destinyData.destinyId.fishPondList.map((pond) => (
                    <Box
                      key={pond.fishPondId}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                    >
                      <Text fontWeight="bold">{pond.pondName}</Text>
                      <Text>{pond.description}</Text>
                      {pond.imgUrl && (
                        <Image
                          src={pond.imgUrl}
                          alt={pond.pondName}
                          boxSize="100px"
                          mt={2}
                        />
                      )}
                    </Box>
                  ))}
                </VStack>
              </>
            )}
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
