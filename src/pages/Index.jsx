import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Text, VStack, Image, useToast } from "@chakra-ui/react";
import { FaBroadcastTower } from "react-icons/fa";

const Index = () => {
  const [description, setDescription] = useState("");
  const [commercial, setCommercial] = useState(null);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!description) {
      toast({
        title: "Error",
        description: "Description can't be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch("https://official-joke-api.appspot.com/jokes/programming/random");
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
      const jokeData = await response.json();
      setCommercial({
        description: jokeData[0].setup + " " + jokeData[0].punchline,
        imageSrc: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwY29uY2VwdHxlbnwwfHx8fDE3MTAyNjI1OTB8MA&ixlib=rb-4.0.3&q=80&w=1080",
      });
      setDescription("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={4} align="stretch">
        <Box textAlign="center">
          <Text fontSize="3rem">📻</Text>
          <Text fontSize="2xl" fontWeight="bold" mt={2}>
            Commercial Creator
          </Text>
        </Box>

        <FormControl id="commercial-description">
          <FormLabel>Enter your commercial description</FormLabel>
          <Input placeholder="e.g. Our new refreshing drink will cool you off on a hot day!" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>

        <Button colorScheme="green" onClick={handleSubmit}>
          Create Commercial
        </Button>

        {commercial && (
          <VStack spacing={4} p={4} borderWidth="1px" borderRadius="lg">
            <Text fontWeight="bold" fontSize="lg">
              Your Commercial
            </Text>
            <Image src={commercial.imageSrc} alt="Commercial Image" />
            <Text>{commercial.description}</Text>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
