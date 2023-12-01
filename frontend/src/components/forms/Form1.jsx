import React, { useState } from 'react';
import { Text, Spinner, Button } from '@chakra-ui/react';
import TimeRangeForm from './TimeRangeForm';

const Form1 = ({ onDataFetch, whichQuery }) => {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleDataFetch = async (data) => {
    setLoading(true);
    
    try {
      
      const formattedStartDate = startDate + " " + startTime
      const formattedEndDate = endDate + " " + endTime
      
      const response = await fetch(`${window.myGlobalVariable}query${whichQuery}?start_date=${formattedStartDate}&end_date=${formattedEndDate}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token')).access_token}`,
        },
      });

      const fetchedData  = await response.json();
      onDataFetch(fetchedData);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }};

  return (
    <div>
      { whichQuery=="1" ? (
      <Text maxW="md" mt="5" fontSize="xl" color="black">
        📄 Find the total logs per type that were created within a specified time range and sort them in 
        a descending order
      </Text>

      ) : whichQuery=="4" ? (
        <Text maxW="md" mt="5" fontSize="xl" color="black">
        🔝 Find the top-5 Block IDs with regards to total number of actions per day for a specific date
        range (for types that Block ID is available)
        </Text>

      ) : (
        <Text maxW="md" mt="5" fontSize="xl" color="black">
          🍀 Find IPs that have issued any four distinct HTTP methods on a particular time range
        </Text>
      )}

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

export default Form1;
