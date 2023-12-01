import React, { useState } from 'react';
import { Text, Input, Button, VStack, Link } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');

  const userInput = {
    "username": username,
    "password": password,
  }


  const handleLogin = async () => {
    console.log(username, password)
    try {
      const response = await fetch(`http://localhost:8000/login`, {
          method: 'POST',
          mode: 'cors',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput)
      })

      if (response.status == 409) {
          setError("Invalid credentials!")

      } else {
        setError(null)
        
        const token = await response.json();
        
        localStorage.setItem('access_token', JSON.stringify(token));
        
        onLogin(token);
        navigate('/menu')
      }

    } catch (error) {
      setError(error)
    }
  };

  return (
    <VStack spacing="4">
      <Text fontSize="xl">Login</Text>
      <Text fontSize="lg" fontWeight="bold">Username</Text>
        <Input
          maxW="sm"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          mb="2"
        />

      <Text fontSize="lg" fontWeight="bold">Password</Text>
      <Input
          maxW="sm"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb="4"
        />

      {error != "" ? (
            <Text fontSize="lg" mb="3" color="red" fontWeight="bold">{error}</Text>
        ) : (null)}

      <Button colorScheme="blue" onClick={handleLogin}>
        Login
      </Button>
      <Text>
        Don't have an account?{' '}
        <Link as={RouterLink} to="/register">
          <u>Register here</u>
        </Link>
      </Text>
    </VStack>
  );
};

export default LoginForm;
