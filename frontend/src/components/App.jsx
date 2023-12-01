import React, { useState } from 'react';
import { Box, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink, BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';
import Menu from './Menu';
import authService from './forms/authService';

const App = () => {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  window.myGlobalVariable = "http://localhost:8000/"

  const handleLogin = async (token) => {
    setToken(token);

    try {
      const userInfo = await authService.getUserInfo(token);
      setUser(userInfo);

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
      <BrowserRouter>
        <Box p="4">
        {!token ? (
          <>
          <Link as={RouterLink} to="/">
            <Heading mt="10" mb="3" align="center" as="h1" >
              📄<u>Log Management System</u>
            </Heading>
          </Link>
          </>
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
