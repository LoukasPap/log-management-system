// Form1.js
import React from 'react';
import DateForm from './DateForm';

const Form1 = ({ onDataFetch }) => {
  const handleDataFetch = async (data) => {
    // Assuming the API response is in the expected format
    try {
      // const response = await fetch(`http://localhost:8000/query1?start_date=${data.sd}&end_date=${data.ed}`);
      const response = await fetch(`http://127.0.0.1:8001/query1?start_date=2005-10-20%2022:24:46&end_date=2009-12-20%2022:24:48`);

      const responseData = await response.json();
      // Pass the fetched data to the parent component
      onDataFetch(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Find the total logs per type that were created<br/>within a specified time range and sort them in 
      a descending order</h2>
      <br/>
      <DateForm onSubmit={handleDataFetch} />
    </div>
  );
};

export default Form1;
