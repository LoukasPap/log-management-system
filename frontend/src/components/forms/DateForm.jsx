import React, { useState } from 'react';
import { VStack, Input, Button, Text } from '@chakra-ui/react';

const DateForm = ({ day, onDayChange }) => {
    const [startDate, setStartDate] = useState('');


  return (
    <VStack spacing="4" align="start">
      <Text fontSize="lg" fontWeight="bold">Day (MM/DD/YYYY)</Text>
      <Input
        type="date"
        value={day}
        onChange={(e) => onDayChange(e.target.value)}
      />

    </VStack>
  );
};

export default DateForm;
