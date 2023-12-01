import React, { useState } from 'react';
import { Text, Button, Spinner, Select } from '@chakra-ui/react';
import TimeRangeForm from './TimeRangeForm';

const Form11 = ({ onDataFetch }) => {
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  
  const [method1, setMethod1] = useState('');
  

  const handleDataFetch = async (data) => {
    setLoading(true)
    
    try {
      const formattedStartDate = startDate + " " + startTime
      const formattedEndDate = endDate + " " + endTime

      const response = await fetch(`${window.myGlobalVariable}query11?start_date=${formattedStartDate}&end_date=${formattedEndDate}&http_method=${method1}`,
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
        🗓️ Find IPs that have issued a particular HTTP method on a particular time range
      </Text>

      <Text ml="1" mt="5" mb="3" fontSize="lg" fontWeight="bold">HTTP Method</Text>
      <Select
        mb="3"
        placeholder="Select 1st HTTP Method"
        value={method1}
        onChange={(e) => setMethod1(e.target.value)}
      >
        <option value="GET">GET</option>
        <option value="HEAD">HEAD</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
        <option value="CONNECT">CONNECT</option>
        <option value="OPTIONS">OPTIONS</option>
        <option value="TRACE">TRACE</option>
        <option value="PATCH">PATCH</option>
      </Select>
      
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

export default Form11;
