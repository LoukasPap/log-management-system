// Form2.js
import React, { useState } from 'react';
import TimeRangeForm from './TimeRangeForm';
import { Input, VStack, Text, Button, Spinner } from '@chakra-ui/react';


const Form2 = ({ onDataFetch }) => {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const [action, setAction] = useState('');


  const handleDataFetch = async (data) => {
    setLoading(true);

    try {
      console.log("hi|" + startDate, endDate, action)

      const response = await fetch(`http://localhost:8001/query2?start_date=2002-10-20%2022:24:46&end_date=2013-11-09%2021:20:55&type=ACCESS`);
      // const response = await fetch(`http://127.0.0.1:8000/query2?start=startDate&end=endDate&type=action`);
      
      const fetchedData = await response.json();
      onDataFetch(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Text maxW="md" mt="5" fontSize="xl" color="black">
        Find the total logs per day for a specific action type and time range ☀️
      </Text>

      <VStack mb="5" spacing="4" align="start">
        <Text mt="5" fontSize="lg" fontWeight="bold">Action</Text>
        <Input
          type="text"
          placeholder="Action Type"
          onChange={(e) => setAction(e.target.value)}
        />
      </VStack>
      
      <TimeRangeForm
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(date) => setStartDate(date)}
          onEndDateChange={(date) => setEndDate(date)}
        />
      
      <Button mt="5" colorScheme="whatsapp" onClick={handleDataFetch}>
        Fetch {loading && <Spinner ml="3" size="sm" />}
      </Button>
    </div>
  );
};

export default Form2;
