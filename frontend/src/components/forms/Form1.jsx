// Form1.js
import React, { useState } from 'react';
import { Text, Spinner, Button } from '@chakra-ui/react';
import TimeRangeForm from './TimeRangeForm';

const Form1 = ({ onDataFetch, which_query }) => {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleDataFetch = async (data) => {
    setLoading(true);
    
    try {
      const formattedStartDate = startDate+' '+startTime
      const formattedEndDate = endDate+' '+endTime

      console.log("hi|" + startDate, endDate)
      // const response = await fetch(`http://localhost:8001/query1?start_date=formattedStartDate&end_date=formattedEndDate`);
      const response = await fetch(`http://127.0.0.1:8001/query`+which_query+`?start_date=2004-10-20 22:24:46&end_date=2009-12-20 22:24:48`);

      const fetchedData  = await response.json();
      onDataFetch(fetchedData);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div>
      { which_query=="1" ? (
      <Text maxW="md" mt="5" fontSize="xl" color="black">
        Find the total logs per type that were created within a specified time range and sort them in 
        a descending order 📄
      </Text>
      ) : (
        <Text maxW="md" mt="5" fontSize="xl" color="black">
        Find the top-5 Block IDs with regards to total number of actions per day for a specific date
        range (for types that Block ID is available) 🔝
        </Text>
      )}
      <br/>
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

export default Form1;
