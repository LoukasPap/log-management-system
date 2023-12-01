import React from 'react';
import { Box, VStack, Heading, Button } from '@chakra-ui/react';

const MenuItem = ({ label, isSelected, onClick }) => {
    return (
      <Button
        variant="ghost"
        colorScheme={isSelected ? 'white' : 'white'}
        bg={isSelected ? 'orange.400' : 'blue'}
        onClick={onClick}
        width="100%"
        textAlign="right"
        borderRadius="5"
      >
        {label}
      </Button>
    );
  };

const Sidebar = ({ onMenuClick }) => {

  const menuItems = [
    { label: 'Query 1', key: 'Query 1' },
    { label: 'Query 2', key: 'Query 2' },
    { label: 'Query 3', key: 'Query 3' },
    { label: 'Query 4', key: 'Query 4' },
    { label: 'Query 5', key: 'Query 5' },
    { label: 'Query 6', key: 'Query 6' },
    { label: 'Query 7', key: 'Query 7' },
    { label: 'Query 8', key: 'Query 8' },
    { label: 'Query 9', key: 'Query 9' },
    { label: 'Query 10', key: 'Query 10' },
    { label: 'Query 11', key: 'Query 11' },
    { label: 'Query 12', key: 'Query 12' },
    { label: 'Query 13', key: 'Query 13' },
    { label: 'Account', key: 'Account' },
  ];

  const [selectedMenu, setSelectedMenu] = React.useState('');
  const handleMenuClick = (menuKey) => {
    setSelectedMenu(menuKey);
    onMenuClick(menuKey);
  };

  return (
    <Box
      as="nav" pos="fixed" left="0" top="0" h="100%"
      w="150px" bg="blue.500" color="white" p="4" zIndex="1000">


      <VStack spacing="4" align="center">

        <Heading p="5" align="start" as="h1" size="md">
          Log Management System
        </Heading>

        {menuItems.map((menuItem) => (
            <MenuItem
            textAlign="start"
            fontSize="xl"
            as="h1"
            key={menuItem.key}
            label={menuItem.label}
            isSelected={selectedMenu === menuItem.key}
            onClick={() => handleMenuClick(menuItem.key)}
            />
        ))}
      </VStack>

    </Box>
  );
};

export default Sidebar;