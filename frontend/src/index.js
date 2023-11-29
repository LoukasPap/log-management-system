import React, {useState} from "react";
import { render } from 'react-dom';
import { ChakraProvider, CSSReset, theme, Flex, Box, Text } from "@chakra-ui/react";

import Sidebar from "./components/Sidebar";
import Form1 from './components/forms/Form1';
import Form2 from './components/forms/Form2';
import Form3 from './components/forms/Form3';
import Form4 from "./components/forms/Form4";
import Form11 from './components/forms/FormQ11';
import Form12 from './components/forms/FormQ12';
import EmptyForm from './components/forms/EmptyForm';

import DataTable from './components/DataTable';

function App() {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [formComponent, setFormComponent] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  console.log(apiData)


  const handleMenuClick = async (menuOption, whichQuery) => {
    setApiData([]);
    setCurrentPage(1);
    setSelectedMenu(menuOption);
    setLoading(true); // Set loading to true when starting the data fetch

    // Set the corresponding form component based on the selected menu
    switch (menuOption) {
      case 'Query 1':
        setFormComponent(<Form1 onDataFetch={setApiData} which_query={'1'} />);
        break;
      case 'Query 2':
        setFormComponent(<Form2 onDataFetch={setApiData} />);
        break;
      case 'Query 3':
        setFormComponent(<Form3 onDataFetch={setApiData} whichQuery={'3'} />);
        break;
      case 'Query 4':
        setFormComponent(<Form1 onDataFetch={setApiData} whichQuery={'4'} />);
        break;
      case 'Query 5':
        setFormComponent(<EmptyForm onDataFetch={setApiData} whichQuery={'5'} />);
        break;
      case 'Query 6':
        setFormComponent(<EmptyForm onDataFetch={setApiData} whichQuery={'6'} />);
        break;
      case 'Query 7':
        setFormComponent(<Form4 onDataFetch={setApiData} whichQuery={'7'} />);
        break;
      case 'Query 8':
        setFormComponent(<EmptyForm onDataFetch={setApiData} whichQuery={'8'} />);
        break;
      case 'Query 9':          
        setFormComponent(<EmptyForm onDataFetch={setApiData} whichQuery={'9'} />);
        break;
      case 'Query 10':            
        setFormComponent(<EmptyForm onDataFetch={setApiData} whichQuery={'10'} />);
        break;
      case 'Query 11':
        setFormComponent(<Form11 onDataFetch={setApiData} whichQuery={'11'} />);
        break;
      case 'Query 12':
        setFormComponent(<Form12 onDataFetch={setApiData} whichQuery={'12'} />);
        break;
      case 'Query 13':
        setFormComponent(<Form1 onDataFetch={setApiData} />);
        break;
      default:
        setFormComponent(null);
    }
  }

  const handleDataFetch = async (data) => {
    try {
      // Perform your actual data fetch here
      // For example:
      // const fetchedData = await fetchDataFunction(data);
  
      // Set the fetched data
      // setApiData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // Set loading to false after the data fetch is complete
      setLoading(false);
    }
  };

  return (
    
    <ChakraProvider>
      {/* <Sidebar />
      <Records /> */}
      <CSSReset />
      <Flex direction="column" h="100vh">
        {/* <Header /> */}
        <Flex flexGrow="1">
          <Sidebar onMenuClick={handleMenuClick}/>
          <Box ml="200px" p="4">

            {/* Forms */}
            {formComponent && (
              <Box mb="4">
                {formComponent}
              </Box>
            )}

             {/* Display fetched data in raw JSON format */}
             {<DataTable data={apiData} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}

            {/* Central Text Component */}
            <Flex align="center" justify="center" h="100%">
            {!formComponent && apiData.length === 0 && <Text fontSize="2xl">Select a menu option</Text>}
            </Flex>
          </Box>
            {/* <Records/> */}
        </Flex>
      </Flex>
    </ChakraProvider>
  )

}

const rootElement = document.getElementById("root")
render(<App />, rootElement)
