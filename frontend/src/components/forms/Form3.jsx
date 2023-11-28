// Form1.js
import React from 'react';
import { Text } from '@chakra-ui/react';
import DateForm from './DateForm';

const Form1 = ({ onDataFetch, which_query }) => {
  const handleDataFetch = async (data) => {
    
    
    try {
      console.log("here")
      console.log(data.sd)
      // const response = await fetch(`http://localhost:8001/query3?day=${data.sd}`);
      const response = await fetch(`http://127.0.0.1:8001/query3?day=2005-10-20`);

      const responseData = await response.json();

      onDataFetch(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <Text maxW="md" mt="5" fontSize="xl" color="black">
        Find the most common log per source IP for a specific day
      </Text>
      <br/>
      <DateForm onSubmit={handleDataFetch} />
    </div>
  );
};

export default Form1;
