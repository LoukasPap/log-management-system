// Form1.js
import React, { useState } from 'react';
import { Text, Button, Spinner, Select } from '@chakra-ui/react';
import TimeRangeForm from './TimeRangeForm';

const Form11 = ({ onDataFetch, whichQuery }) => {
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  
  const [method1, setMethod1] = useState('');
  const [method2, setMethod2] = useState('');
  

  const handleDataFetch = async (data) => {
    setLoading(true)
    
    try {
      console.log(method1+ method2)
      // const response = await fetch(`http://127.0.0.1:8001/query12?start_date=`+startDate+`&end_date=`+endDate+`&http_method=`+method1+`&http_method2=`+method2);
      const response = await fetch(`http://127.0.0.1:8001/query12?start_date=2003-10-20%2022:24:46&end_date=2019-12-20%2022:24:48&http_method1=GET&http_method2=POST`);

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
        🖱️ Find IPs that have issued two particular HTTP methods on a particular time range
      </Text>

      <Text mt="5" fontSize="lg" fontWeight="bold">First HTTP Method</Text>
      <Select mt="5"
        placeholder="Select 1st HTTP Method"
        value={method1}
        onChange={(e) => setMethod1(e.target.value)}
      >
        <option value="GET">GET</option>
        <option value="HEAD">HEAD</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
        <option value="CONNECT">CONNECT</option>
        <option value="OPTIONS">OPTIONS</option>
        <option value="TRACE">TRACE</option>
        <option value="PATCH">PATCH</option>
      </Select>
      
      <Text mt="5" fontSize="lg" fontWeight="bold">Second HTTP Method</Text>
      <Select mt="5"
        placeholder="Select 2nd HTTP Method"
        value={method2}
        onChange={(e) => setMethod2(e.target.value)}
      >
        <option value="GET">GET</option>
        <option value="HEAD">HEAD</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
        <option value="CONNECT">CONNECT</option>
        <option value="OPTIONS">OPTIONS</option>
        <option value="TRACE">TRACE</option>
        <option value="PATCH">PATCH</option>
      </Select>

      <TimeRangeForm
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={(date) => setStartDate(date)}
        onEndDateChange={(date) => setEndDate(date)}
      />
      

      <Button mt="5" colorScheme="whatsapp" onClick={handleDataFetch}>
        Fetch {loading && <Spinner ml="3" size="sm" />}
      </Button>
    </div>
  );
};

export default Form11;