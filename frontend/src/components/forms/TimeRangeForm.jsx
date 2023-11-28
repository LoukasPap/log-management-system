// DateForm.js
import React, { useState } from 'react';
import { VStack, Input, Button, Text } from '@chakra-ui/react';

const formatDate = (date) => {
    const year = date.getFullYear().toString().slice(-2);
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    const hours = (`0${date.getHours()}`).slice(-2);
    const minutes = (`0${date.getMinutes()}`).slice(-2);
    const seconds = (`0${date.getSeconds()}`).slice(-2);
  
    return `${year}${month}${day} ${hours}${minutes}${seconds}`;
  };

const DateForm = ({ onSubmit }) => {
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');

  const handleSubmit = async () => {
    try {
        const formattedStartDate = startDate+' '+startTime
        const formattedEndDate = endDate+' '+endTime
        onSubmit({ sd: formattedStartDate, ed: formattedEndDate });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    // <VStack spacing="4" align="start">
    //   <Input
    //   type="date"
    //   value={startDate}
    //   onChange={(e) => setStartDate(e.target.value)}
    //   placeholder="Start Date"
    //   />
    //   <Input
    //   type="time"
    //   value={startTime}
    //   onChange={(e) => setStartTime(e.target.value)}
    //   placeholder="Start Time"
    //   step="1" // Allow seconds input
    //   />
    //   <Input
    //   type="date"
    //   value={endDate}
    //   onChange={(e) => setEndDate(e.target.value)}
    //   placeholder="End Date"
    //   />
    //   <Input
    //   type="time"
    //   value={endTime}
    //   onChange={(e) => setEndTime(e.target.value)}
    //   placeholder="End Time"
    //   step="1" // Allow seconds input
    //   />
    //   <Button onClick={handleSubmit}>Fetch Data</Button>
    // </VStack>

    <VStack spacing="4" align="start">
      <Text fontSize="lg" fontWeight="bold">Date Range</Text>
      <Input
        type="text"
        placeholder="Start Date (YYYY-MM-DD HH:MM:SS)"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <Input
        type="text"
        placeholder="End Date (YYYY-MM-DD HH:MM:SS)"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <Button colorScheme="whatsapp" onClick={handleSubmit}>
        Fetch
      </Button>
    </VStack>
  );
};

export default DateForm;
