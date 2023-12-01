import React, { useState } from 'react';
import { Text, Button, Spinner } from '@chakra-ui/react';
import DateForm from './DateForm';

const Form1 = ({ onDataFetch }) => {
  const [loading, setLoading] = useState(false);
  const [day, setDay] = useState('');

  const handleDataFetch = async (data) => {
    setLoading(true)
    
    try {
      
      const response = await fetch(`${window.myGlobalVariable}query3?day=${day}`,
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
