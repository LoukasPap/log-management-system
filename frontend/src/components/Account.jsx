// Form2.js
import React, { useState } from 'react';
import { Input, HStack, VStack, Text, Button, Select, Heading, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const Account = ({ onDataFetch }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  
    const [type, setType] = useState('');
    const [log, setLog] = useState('');

    const Logout = async () => {

    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    navigate("/")

  };

  const AddLog = async (data) => {
    try {
        const response = await fetch(`http://localhost:8001/query2?start_date=2002-10-20%2022:24:46&end_date=2013-11-09%2021:20:55&type=ACCESS`,
        {


        });
        // const response = await fetch(`http://127.0.0.1:8000/query2?start=startDate&end=endDate&type=action`);
        
        const fetchedData = await response.json();
        onDataFetch(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
  }

  return (
    <div>
        <Heading as="h1" mt="105" fontFamily={"monospace"}>
            Hello, {JSON.parse(localStorage.getItem('user')).username} 😶
        </Heading>
      

        <Text mt="5" maxX="lg" fontSize="lg" >You can insert a new log by pasting it
        and choosing the appropriate type.</Text>
        <HStack mt="3" mb="5" spacing="3" align="flex-end">
            <VStack>
                <Text textAlign="end" fontSize="lg" fontWeight="bold">Type</Text>
                <Select
                    placeholder="-"
                    defaultValue={"ACCESS"}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    >
                    <option value="ACCESS">ACCESS LOG</option>
                    <option value="DATAXCEIVER">HDFS_DATAXCEIVER</option>
                    <option value="FSNAMESYSTEM">HDFS_FSNAMESYSTEM</option>
                </Select>
            </VStack>
            <VStack>
                <Text fontSize="lg" fontWeight="bold">Log</Text>
                <Input
                type="text"
                placeholder="Log"
                minW="xl"
                onChange={(e) => setLog(e.target.value)}
                />
            </VStack>
            <VStack>
                <Button bg="ButtonFace" onClick={AddLog}>
                    Insert {loading && <Spinner ml="3" size="sm" />}
                </Button>
            </VStack>
        </HStack>
    
        <VStack align="start" mt="100">
            <Text mb="3">
                Or you can...
            </Text>
            <Button  color="white" bg="red" onClick={Logout}> Logout </Button>
        </VStack>
    </div>
    );
};

export default Account;
