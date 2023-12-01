import React, { useState } from 'react';
import { Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    Divider,
    Tooltip, Input,
    HStack, VStack,
    Text, Button, Select,
    Heading,
    Spinner,
    Badge,
    Tag
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';


const Account = ({ onDataFetch }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  
    const [type, setType] = useState('');
    const [log, setLog] = useState('');
    const [ip, setIP] = useState('');

    const [result, setResult] = useState('');

    const Logout = async () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        navigate("/")
        window.location.reload();
  };

    const userInput = {
    "type": type,
    "log": log,
    }

    const handleInsert = async (data) => {
        setLoading(true)
        try {
            const response = await fetch(`${window.myGlobalVariable}insertlog`, {
                method: 'POST',
                mode: 'cors',
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token')).access_token}`
                },
                body: JSON.stringify(userInput)
            });

            const fetchedResponse = await response.json();
            console.log(fetchedResponse.response)
            setResult(fetchedResponse)

        } catch (error) {
            console.error('Error fetching response:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleDataFetch = async (data) => {
        setLoading(true);
        
        try {
          const response = await fetch(`${window.myGlobalVariable}searchIP?ip_address=${ip}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token')).access_token}`,
            },
          });
    
          const fetchedData  = await response.json();
          onDataFetch(fetchedData);
    
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }};

        const info =`
            Full name: ${JSON.parse(localStorage.getItem('user')).fullname}
            | Address: ${JSON.parse(localStorage.getItem('user')).address}\n
            | Email:${JSON.parse(localStorage.getItem('user')).email}
            `

  return (
    <div>
        <Heading overflowWrap={"false"} as="h1" mt="105" fontFamily={"monospace"}>
            Hello, 
            <Tooltip label={`${info}`} placement="top">
                <Badge boxShadow='lg' verticalAlign="baseline" fontSize='0.9em' bg="lightgray" borderRadius="5" m="1" p="1">
                    {JSON.parse(localStorage.getItem('user')).username}
                </Badge>
            </Tooltip>

                😶
            <Popover placement="end" >
                <PopoverTrigger >
                    <Button ml="20%" bg="lightgray" align="flex-end">
                        <HamburgerIcon cursor="pointer" boxSize={6} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent maxW={{ base: "100%", lg: "max-content" }}>
                    <PopoverArrow />
                    <PopoverBody>
                        <Button _hover={{ bg: "red.600"}} color="white" bg="red.500" onClick={Logout}>
                            Logout
                            </Button>
                    </PopoverBody>
                </PopoverContent>
            </Popover>            
        </Heading>

        <Divider mt="5"/>

        <Text mt="5" fontSize="lg" >You can insert a new log by pasting it
        and choosing the appropriate type.</Text>
        <HStack mt="3" mb="5" spacing="3" align="flex-end">
            <VStack align="start">
                <Text ml="1" fontSize="lg" fontWeight="bold">Type</Text>
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
            <VStack align="start">
                <Text ml="1" fontSize="lg" fontWeight="bold">Log</Text>
                <Input
                type="text"
                placeholder="Log"
                minW="xl"
                onChange={(e) => setLog(e.target.value)}
                />
            </VStack>
            <VStack>
                { result.response != null ? (
                <Text color={result.response!="Fail" ? "green.500" : "red.500"}>{(result.response!="Fail" ? "Inserted" : "Failed")}</Text>
                 ) : (null)
                }
                <Button bg="ButtonFace" onClick={handleInsert}>
                    Insert {loading && <Spinner ml="3" size="sm" />}
                </Button>
                
            </VStack>
        </HStack>
        <Divider  mt="10"/>
        <VStack align="start" mt="10" mb="10">
            <Text mb="3">
                Or, you can search all the associated logs with an IP.
            </Text>
            <Text ml="1" fontSize="lg" fontWeight="bold">Address IP</Text>
            <HStack align="flex-end">
                <Input
                    type="text"
                    placeholder="Enter the IP..."
                    minW="xl"
                    onChange={(e) => setIP(e.target.value)}
                    />

                <Button colorScheme="whatsapp" onClick={handleDataFetch}>
                    Fetch {loading && <Spinner ml="6" size="sm" />}
                </Button>
            </HStack>
        </VStack>
    </div>
    );
};

export default Account;
