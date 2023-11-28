import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";

const RecordsContext = React.createContext({
    base: [], fetchResults: () => {}
  })

  export default function Records() {
    const [records, setRecords] = useState([])
    const fetchResults = async () => {
      const response = await fetch("http://localhost:8000/query1?start_date=2005-10-20%2022:24:46&end_date=2009-12-20%2022:24:48")
      const records = await response.json()
      setRecords(records.data)
      console.log(records)
    }
    useEffect(() => {
        fetchResults()
      }, [])
      
      return (
        <RecordsContext.Provider value={{records, fetchResults}}>
          <Stack spacing={5}>
            {records.map((todo) => (
              <b>{todo}</b>
            ))}
          </Stack>
        </RecordsContext.Provider>
      )
  }

