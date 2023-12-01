import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, Button, Text } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';
import Menu from './Menu';
import authService from './forms/authService';

const App = () => {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = async (token) => {
    setToken(token);

    try {
      const userInfo = await authService.getUserInfo(token);
      
      console.log(userInfo)
      setUser(userInfo);


    } catch (error) {
      console.error(error.message);
    }
  };


  return (
      <BrowserRouter>
        <Box p="4">
        {!token ? (
          <Heading mt="10" mb="3" align="center" as="h1" >
            Log Management System
          </Heading>
          ) : (null)}

        <Routes>

          {token ? (
            <Route path="/menu" element={<Menu />} />
          ) : (
            <>
            <Route path="/register" element={<RegisterForm />} />
            </>
          )};
          <Route path="/" element={<LoginForm onLogin={handleLogin} />} />

        </Routes>
        </Box>
      </BrowserRouter>
  );
};

export default App;
