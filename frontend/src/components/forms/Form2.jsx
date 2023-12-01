import React, { useState } from 'react';
import TimeRangeForm from './TimeRangeForm';
import { VStack, Text, Button, Spinner, Select } from '@chakra-ui/react';


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

      const formattedStartDate = startDate+' '+startTime
      const formattedEndDate = endDate+' '+endTime
      
      const response = await fetch(`${window.myGlobalVariable}query2?start_date=${formattedStartDate}&end_date=${formattedEndDate}&type=${action}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token')).access_token}`,
        },
      });
            
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
        ☀️ Find the total logs per day for a specific action type and time range
      </Text>

      <VStack mb="5" spacing="4" align="start">
        <Text mt="5" fontSize="lg" fontWeight="bold">Action</Text>
        <Select
          placeholder="-"
          defaultValue={"ACCESS"}
          value={action}
          onChange={(e) => setAction(e.target.value)}
          >
          <option value="ACCESS">ACCESS</option>
          <option value="RECEIVED">RECEIVED</option>
          <option value="RECEIVING">RECEIVING</option>
          <option value="SERVED">SERVED</option>
          <option value="REPLICATE">REPLICATE</option>
          <option value="DELETE">DELETE</option>
        </Select>
      </VStack>
      
      <TimeRangeForm
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(date) => setStartDate(date)}
          onEndDateChange={(date) => setEndDate(date)}
          onStartTimeChange={(date) => setStartTime(date)}
          onEndTimeChange={(date) => setEndTime(date)}
        />
      
      <Button mt="5" colorScheme="whatsapp" onClick={handleDataFetch}>
        Fetch {loading && <Spinner ml="3" size="sm" />}
      </Button>
    </div>
  );
};

export default Form2;
