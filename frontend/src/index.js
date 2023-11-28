import React, {useState} from "react";
import { render } from 'react-dom';
import { ChakraProvider, CSSReset, theme, Flex, Box, Text } from "@chakra-ui/react";

import Sidebar from "./components/Sidebar";
import Form1 from './components/forms/Form1';
import Form2 from './components/forms/Form2';
import Form3 from './components/forms/Form3';
import EmptyForm from './components/forms/EmptyForm';

import DataTable from './components/DataTable';
import Form4 from "./components/forms/Form4";

function App() {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [formComponent, setFormComponent] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  console.log('api data')
  console.log(apiData)



  const handleMenuClick = async (menuOption, which_query) => {
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
        setFormComponent(<Form3 onDataFetch={setApiData} which_query={'3'}  />);
        break;
      case 'Query 4':
        setFormComponent(<Form1 onDataFetch={setApiData} which_query={'4'} />);
        break;
      case 'Query 5':
        setFormComponent(<EmptyForm onDataFetch={setApiData} which_query={'5'} />);
        break;
      case 'Query 6':
        setFormComponent(<EmptyForm onDataFetch={setApiData} which_query={'6'}/>);
        break;
      case 'Query 7':
        setFormComponent(<Form4 onDataFetch={setApiData} which_query={'7'} />);
        break;
      case 'Query 8':
        setFormComponent(<Form2 onDataFetch={setApiData} />);
        break;
      case 'Query 9':          
        setFormComponent(<Form2 onDataFetch={setApiData} />);
        break;
      case 'Query 10':            
        setFormComponent(<Form1 onDataFetch={setApiData} />);
        break;
      case 'Query 11':
        setFormComponent(<Form2 onDataFetch={setApiData} />);
        break;
      case 'Query 12':
        setFormComponent(<Form2 onDataFetch={setApiData} />);
        break;
      case 'Query 13':
        setFormComponent(<Form1 onDataFetch={setApiData} />);
        break;
      default:
        setFormComponent(null);
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoading(false); // Set loading to false after the data fetch is complete
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Ensure loading is set to false even if there's an error
    }
  }

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
