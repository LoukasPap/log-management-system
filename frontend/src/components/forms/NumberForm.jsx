// DateForm.js
import React, { useState } from 'react';
import { VStack, Input, Button, Text } from '@chakra-ui/react';

const NumberForm = ({ onSubmit }) => {
  const [number, setNumber] = useState('');

  const handleSubmit = async () => {
    try {

      onSubmit({ size: number});
    } catch (error) {
      console.error('Error fetching data:', number);
    }
  };

  return (
    <VStack spacing="4" align="start">
      <Text fontSize="lg" fontWeight="bold">Size</Text>
      <Input
      type="number"
      value={number}
      onChange={(e) => setNumber(e.target.value)}
      placeholder="Size"
      />

      <Button colorScheme="whatsapp" onClick={handleSubmit}>
        Fetch
      </Button>
    </VStack>
  );
};

export default NumberForm;
