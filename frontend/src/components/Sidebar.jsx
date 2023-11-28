// Sidebar.js
import React from 'react';
import { Box, VStack, Heading, Flex, Text, IconButton, useColorMode } from '@chakra-ui/react';

const Sidebar = ({ onMenuClick }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="nav"
      pos="fixed"
      left="0"
      top="0"
      h="100%"
      w="150px"
      bg="blue.500"
      color="white"
      p="4"
      zIndex="1000"
    >
      <VStack spacing="4" align="end">
        {/* Header inside the Sidebar */}
        <Heading mb='3' align="right" as="h1" size="md">Log <br/>Management System</Heading>

        {/* Sidebar options */}
        <Text fontSize="xl" cursor="pointer" onClick={() => onMenuClick('Query 1')}>
            Query 1
        </Text>
        <Text fontSize="xl" cursor="pointer" onClick={() => onMenuClick('Query 2')}>
            Query 2
        </Text>
        <Text fontSize="xl" cursor="pointer" onClick={() => onMenuClick('Query 3')}>
            Query 3
        </Text>
        <Text fontSize="xl" cursor="pointer" onClick={() => onMenuClick('Query 4')}>
            Query 4
        </Text>
        <Text fontSize="xl" cursor="pointer" onClick={() => onMenuClick('Query 5')}>
            Query 5
        </Text>
        <Text fontSize="xl" cursor="pointer" onClick={() => onMenuClick('Query 6')}>
            Query 6
        </Text>
        <Text fontSize="xl" cursor="pointer" onClick={() => onMenuClick('Query 7')}>
            Query 7
        </Text>
        <Text fontSize="xl" cursor="pointer" onClick={() => onMenuClick('Query 8')}>
            Query 8
        </Text>
        <Text fontSize="xl" cursor="pointer" onClick={() => onMenuClick('Query 9')}>
            Query 9
        </Text>
        <Text fontSize="xl" cursor="pointer" onClick={() => onMenuClick('Query 10')}>
            Query 10
        </Text>
        <Text fontSize="xl" cursor="pointer" onClick={() => onMenuClick('Query 11')}>
            Query 11
        </Text>
        <Text fontSize="xl" cursor="pointer" onClick={() => onMenuClick('Query 12')}>
            Query 12
        </Text>
        <Text fontSize="xl" cursor="pointer" onClick={() => onMenuClick('Query 13')}>
            Query 13
        </Text>
      </VStack>
    </Box>
  );
};

export default Sidebar;