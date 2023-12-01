import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Text } from '@chakra-ui/react';

const DataTable = ({ data, currentPage, setCurrentPage  }) => {
  const itemsPerPage = 30;
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

        try {
            if (Array.isArray(data.data) && data.data.length > 0 && typeof data.data[0] === 'object') {

                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                setPaginatedData(data.data.slice(startIndex, endIndex));

            } else {
            setPaginatedData([]);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData()
  }, [data, currentPage]);

  const goToFristPage = () => {
    setCurrentPage(1);  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));  };


    if (!Array.isArray(data.data) || data.data.length === 0 || typeof data.data[0] !== 'object') {
    return <div></div>;
  }

  // Extract column names from the data
  const columns = Object.keys(data.data[0]);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, data.data.length);

  return (
    <div>
        <Button mt="0" bg="ActiveBorder" color="white" onClick={goToFristPage} >
            First Page
        </Button>
        <Button mt="0" ml="4" onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
        </Button>
        <Button mt="0" ml="4" onClick={handleNextPage} disabled={paginatedData.length < itemsPerPage}>
            Next
        </Button>
        
        <Text ml="2" mt="2" mb="2" fontSize="sm" color="gray.500">
            Showing {startIndex}-{endIndex} of {data.data.length}
        </Text>

        {paginatedData.length == 0 ? (
            <Text>No results to display.</Text>
        ) : ( 
            <Table variant="striped">
            <Thead>
                <Tr>
                {columns.map((column, index) => (
                    <Th key={index}>{column}</Th>
                ))}
                </Tr>
            </Thead>
            <Tbody>
                {paginatedData.map((item, rowIndex) => (
                <Tr key={rowIndex}>
                    {columns.map((column, colIndex) => (
                    <Td key={colIndex}>{item[column]}</Td>
                    ))}
                </Tr>
                ))}
            </Tbody>
            </Table>
        )}
    </div>
  );
};

export default DataTable;
