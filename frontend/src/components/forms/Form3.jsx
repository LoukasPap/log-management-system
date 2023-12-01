// Form1.js
import React, { useState } from 'react';
import { Text, Button, Spinner } from '@chakra-ui/react';
import DateForm from './DateForm';

const Form1 = ({ onDataFetch, which_query }) => {
  const [loading, setLoading] = useState(false);
  const [day, setDay] = useState('');


  const handleDataFetch = async (data) => {
    setLoading(true)
    
    try {
      console.log("here"+day)
      // const response = await fetch(`http://localhost:8001/query3?day=day`);
      const response = await fetch(`http://127.0.0.1:8001/query3?day=2005-10-20`);

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
        🎲 Find the most common log per source IP for a specific day
      </Text>
      <br/>
      <DateForm
        day={day}
        onDayChange={(day) => setDay(day)}
      />
      
      <Button mt="5" colorScheme="whatsapp" onClick={handleDataFetch}>
        Fetch {loading && <Spinner ml="3" size="sm" />}
      </Button>
    </div>
  );
};

export default Form1;
