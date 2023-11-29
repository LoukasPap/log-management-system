// Form1.js
import React, { useState } from 'react';
import { Text, Button, Spinner } from '@chakra-ui/react';

const Form1 = ({ onDataFetch, which_query }) => {
  const [loading, setLoading] = useState(false);

  const handleDataFetch = async (data) => {
    setLoading(true);

    
    try {
      const response = await fetch(`http://127.0.0.1:8001/query`+which_query);
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
      { which_query=="5" ? (
      <Text maxW="md" mt="5" fontSize="xl" color="black">
        Find the referers (if any) that have led to more than one resources
      </Text>
      ) : which_query=="6" ? (
        <Text maxW="md" mt="5" fontSize="xl" color="black">
          🥈 Find the 2nd–most–common resource requested
        </Text>
      ) : which_query=="8" ? (
        <Text maxW="md" mt="5" fontSize="xl" color="black">
          Find the blocks that have been replicated the same day 
          that they have also been served
        </Text>
      ) : (
        <Text maxW="md" mt="5" fontSize="xl" color="black">
          Find the blocks that have been replicated the same day 
          and hour that they have also been served
        </Text>
        )}
      <br/>
      <Button mt="-3" colorScheme="whatsapp" onClick={handleDataFetch}>
        Fetch {loading && <Spinner ml="3" size="sm" />}
      </Button>

    </div>
  );
};

export default Form1;
