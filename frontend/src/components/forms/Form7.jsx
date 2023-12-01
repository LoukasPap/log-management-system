import React, { useState } from 'react';
import { Text, Button, Input, Spinner } from '@chakra-ui/react';

const Form7 = ({ onDataFetch, which_query }) => {
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState('');
  

  const handleDataFetch = async (data) => {
    setLoading(true);
  
    try {
      const response = await fetch(`${window.myGlobalVariable}query7?size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token')).access_token}`,
        },
      });

      const responseData = await response.json();

      onDataFetch(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Text maxW="md" mt="5" fontSize="xl" color="black">
        🔢 Find the access log (all fields) where the size is less than a specified number
      </Text>
      <Text ml="1" mt="3" fontSize="lg" fontWeight="bold">Size</Text>
      <Input
        mt="2"
        type="number"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        placeholder="Size"
      />
      
      <Button mt="5" colorScheme="whatsapp" onClick={handleDataFetch}>
        Fetch {loading && <Spinner ml="3" size="sm" />}
      </Button>
    </div>
  );
};

export default Form7;
