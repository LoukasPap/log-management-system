// Form2.js
import React, { useState } from 'react';
import DateForm from './DateForm';
import { Input, VStack } from '@chakra-ui/react';

const Form2 = ({ onDataFetch }) => {
  const [additionalText, setAdditionalText] = useState('');

  const handleDataFetch = async (data) => {


    try {
      const response = await fetch(`http://localhost:8001/query2?start_date=2002-10-20%2022:24:46&end_date=2013-11-09%2021:20:55&type=ACCESS`);
      // const response = await fetch(`http://127.0.0.1:8000/query2?start=${data.sd}&end=${data.ed}&type=${data.additionalText}`);
      const responseData = await response.json();
    
      onDataFetch(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Find the total logs per day for a specific action type and time range</h1>

      <VStack spacing="4" align="start">

        <Input
          type="text"
          placeholder="Action type"
          onChange={(e) => setAdditionalText(e.target.value)}
        />
        <DateForm onSubmit={handleDataFetch} />
      </VStack>
    </div>
  );
};

export default Form2;
