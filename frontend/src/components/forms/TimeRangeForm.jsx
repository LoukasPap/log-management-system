import React from 'react';
import { VStack, Input, Text, HStack } from '@chakra-ui/react';
  
const TimeRangeForm = ({ startDate, endDate, startTime, endTime, onStartDateChange, onEndDateChange, onStartTimeChange, onEndTimeChange }) => {

  return (
    <VStack spacing="5" mt="3" align="start">

      <HStack>
          <VStack align="start">
            <Text ml="1" align="start" fontSize="lg" fontWeight="bold">
              Start Date (MM/DD/YYYY)
            </Text>
            <Input
              w="sm"
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              placeholder="Start Date"
              />
          </VStack>
          <VStack align="start">
            <Text ml="1" fontSize="lg" fontWeight="bold">Start Time (HH:MM:SS)</Text>
            <Input
              w="sm"
              type="time"
              value={startTime}
              onChange={(e) => onStartTimeChange(e.target.value)}
              placeholder="Start Time"
              step="1"
              />
          </VStack>
        </HStack>
        <HStack>
        <VStack align="start">
          <Text ml="1" fontSize="lg" fontWeight="bold">
            End Date (MM/DD/YYYY)
            </Text>
          <Input
            w="sm"
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            placeholder="End Date"
          />
        </VStack>

        <VStack align="start">
          <Text ml="1" fontSize="lg" fontWeight="bold">End Time (HH:MM:SS)</Text>
          <Input
            w="sm"
            type="time"
            value={endTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
            placeholder="End Time"
            step="1"
          />
        </VStack>
      </HStack>
  </VStack>

    // <VStack spacing="4" align="start">
    //   <Text fontSize="lg" fontWeight="bold">Date Range</Text>
    //   <Input
    //     type="text"
    //     placeholder="Start Date (YYYY-MM-DD HH:MM:SS)"
    //     value={startDate}
    //     onChange={(e) => setStartDate(e.target.value)}
    //   />
    //   <Input
    //     type="text"
    //     placeholder="End Date (YYYY-MM-DD HH:MM:SS)"
    //     value={endDate}
    //     onChange={(e) => setEndDate(e.target.value)}
    //   />
    // </VStack>
  );
};

export default TimeRangeForm;
