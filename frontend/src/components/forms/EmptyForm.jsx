// Form1.js
import React, { useState } from 'react';
import { Text, Button, Spinner } from '@chakra-ui/react';

const EmptyForm = ({ onDataFetch, whichQuery }) => {
  const [loading, setLoading] = useState(false);

  const handleDataFetch = async (data) => {
    setLoading(true);

    try {
      console.log(whichQuery)

      const response = await fetch(`http://localhost:8001/query`+whichQuery);
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
      { whichQuery=="5" ? (
      <Text maxW="md" mt="5" fontSize="xl" color="black">
        👤 Find the referers (if any) that have led to more than one resources
      </Text>

      ) : whichQuery=="6" ? (
        <Text maxW="md" mt="5" fontSize="xl" color="black">
          🥈 Find the 2nd–most–common resource requested
        </Text>

      ) : whichQuery=="8" ? (
        <Text maxW="md" mt="5" fontSize="xl" color="black">
          🧱 Find the blocks that have been replicated the same day 
          that they have also been served
        </Text>

      ) : whichQuery=="9" ? (
        <Text maxW="md" mt="5" fontSize="xl" color="black">
          🪞 Find the blocks that have been replicated the same day 
          and hour that they have also been served
        </Text>

        ) : (
        <Text maxW="md" mt="5" fontSize="xl" color="black">
          🌐 Find access logs that specified a particular version of Firefox as their browser
        </Text>
        )}
      <Button mt="5" colorScheme="whatsapp" onClick={handleDataFetch}>
        Fetch {loading && <Spinner ml="3" size="sm" />}
      </Button>

    </div>
  );
};

export default EmptyForm;
