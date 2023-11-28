// Form1.js
import React from 'react';
import { Text } from '@chakra-ui/react';
import NumberForm from './NumberForm';

const Form1 = ({ onDataFetch, which_query }) => {
  const handleDataFetch = async (data) => {
    
  
    try {
      console.log("here")
      console.log(data.size)
      // const response = await fetch(`http://localhost:8001/query7?size=${data.size}`);
      const response = await fetch(`http://localhost:8001/query7?size=300`);

      const responseData = await response.json();

      onDataFetch(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <Text maxW="md" mt="5" fontSize="xl" color="black">
        Find the access log (all fields) where the size is less than a specified number
      </Text>
      <br/>
      <NumberForm onSubmit={handleDataFetch} />
    </div>
  );
};

export default Form1;
