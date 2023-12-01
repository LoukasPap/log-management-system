

// components/LoginForm.jsx
import React, { useState } from 'react';
import { Text, Input, Button, VStack, Link } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  
  const [error, setError] = useState('');

  const handleRegister = async () => {
    const userInput = {
        "username": username,
        "password": password,
        "fullname": name,
        "address": address,
        "email": email,
      }
    console.log(JSON.stringify(userInput))

    // await login(username, password);
    const results = await fetch(`http://localhost:8001/register`, {
        method: 'POST',
        mode: 'cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInput)
    }).then(function (response) {
        console.log(response)
        if (response.status == 409) {
            setError("Username already exists!")
        } else {
            setError("")
            navigate('/')
        }

    });

  };

 return (
    <VStack spacing="2" textAlign="end">
      <Text fontSize="xl">Register</Text>

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

        <Text fontSize="lg" fontWeight="bold">Full name</Text>
        <Input
            maxW="sm"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            mb="4"
        />

        <Text fontSize="lg" fontWeight="bold">Address</Text>
        <Input
            maxW="sm"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            mb="4"
        />

        <Text fontSize="lg" fontWeight="bold">Email</Text>
        <Input
            maxW="sm"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb="4"
        />

        {error != "" ? (
            <Text fontSize="lg" mb="3" color="red" fontWeight="bold">{error}</Text>
        ) : (null)}


        <Button colorScheme="blue" onClick={handleRegister}>
          Register
        </Button>
      <Text>
        Already have an account?{' '}
        <Link as={RouterLink} to="/">
          <u>Login here</u>
        </Link>
      </Text>
    </VStack>
  );
};

export default RegisterForm;
