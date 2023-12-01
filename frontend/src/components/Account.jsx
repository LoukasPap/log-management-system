// Form2.js
import React, { useState } from 'react';
import { Input, HStack, VStack, Text, Button, Select, Heading, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const Account = ({ onDataFetch }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  
    const [type, setType] = useState('');
    const [log, setLog] = useState('');

    const [result, setResult] = useState('');

    const Logout = async () => {

    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    navigate("/")

  };

    const userInput = {
    "type": type,
    "log": log,
    }

    const handleInsert = async (data) => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:8002/insertlog`, {
                method: 'POST',
                mode: 'cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userInput)
            })

            const fetchedResponse = await response.json();
            console.log(fetchedResponse.response)
            setResult(fetchedResponse)

        } catch (error) {
            console.error('Error fetching response:', error);
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
                <Text color={result.response!="Fail" ? "green.500" : "red.500"}>{(result.response!="Fail" ? "Inserted" : "Failed")}</Text>
                <Button bg="ButtonFace" onClick={handleInsert}>
                    Insert {loading && <Spinner ml="3" size="sm" />}
                </Button>
                
            </VStack>
        </HStack>


    
        <VStack align="start" mt="100">
            <Text mb="3">
                or you can just...
            </Text>
            <Button  color="white" bg="red" onClick={Logout}> Logout </Button>
        </VStack>
    </div>
    );
};

export default Account;
