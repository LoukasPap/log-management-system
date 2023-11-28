// Form1.js
import React from 'react';
import { Text, Button } from '@chakra-ui/react';

const Form1 = ({ onDataFetch, which_query }) => {
  const handleDataFetch = async (data) => {
    
    
    try {
      console.log("here")
      console.log(which_query)

      const response = await fetch(`http://127.0.0.1:8001/query`+which_query);
      const responseData = await response.json();

      onDataFetch(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      { which_query=="5" ? (
      <Text maxW="md" mt="5" fontSize="xl" color="black">
        Find the referers (if any) that have led to more than one resources.
        </Text>
        ) : (
          <Text maxW="md" mt="5" fontSize="xl" color="black">
           Find the 2nd–most–common resource requested
          </Text>
        )}
      <br/>
      <Button colorScheme="whatsapp" onClick={handleDataFetch}>
        Fetch
      </Button>
    </div>
  );
};

export default Form1;
