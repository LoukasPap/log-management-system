// Form1.js
import React from 'react';
import { Text } from '@chakra-ui/react';
import TimeRangeForm from './TimeRangeForm';

const Form1 = ({ onDataFetch, which_query }) => {
  const handleDataFetch = async (data) => {
    
    
    try {
      console.log("here")
      console.log(which_query)
      // const response = await fetch(`http://localhost:8000/query1?start_date=${data.sd}&end_date=${data.ed}`);
        const response = await fetch(`http://127.0.0.1:8001/query`+which_query+`?start_date=2004-10-20 22:24:46&end_date=2009-12-20 22:24:48`);

      const responseData = await response.json();
      // Pass the fetched data to the parent component
      onDataFetch(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      { which_query=="1" ? (
      <Text maxW="md" mt="5" fontSize="xl" color="black">
        Find the total logs per type that were created within a specified time range and sort them in 
        a descending order
        </Text>
        ) : (
          <Text maxW="md" mt="5" fontSize="xl" color="black">
          Find the top-5 Block IDs with regards to total number of actions per day for a specific date
          range (for types that Block ID is available)
          </Text>
        )}
      <br/>
      <TimeRangeForm onSubmit={handleDataFetch} />
    </div>
  );
};

export default Form1;
