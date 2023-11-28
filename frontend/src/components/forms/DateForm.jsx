// DateForm.js
import React, { useState } from 'react';
import { VStack, Input, Button, Text } from '@chakra-ui/react';

const DateForm = ({ onSubmit }) => {
    const [startDate, setStartDate] = useState('');

  const handleSubmit = async () => {
    try {

      onSubmit({ sd: startDate});
    } catch (error) {
      console.error('Error fetching data:', startDate);
    }
  };

  return (
    <VStack spacing="4" align="start">
      <Text fontSize="lg" fontWeight="bold">Day</Text>
      <Input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      placeholder="DD-MM-YY"
      />

      <Button colorScheme="whatsapp" onClick={handleSubmit}>
        Fetch
      </Button>
    </VStack>
  );
};

export default DateForm;
