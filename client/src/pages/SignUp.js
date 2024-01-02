import React, { useState } from 'react'
import {
  Flex,
  Text,
  Button,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { Navigate, Link as ReactRouterLink } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    userEmail: '', 
    password: '', 
  })
  // const [userEmail, setUserEmail] = React.useState(""); 
  // const [password, setPassword] = React.useState(""); 


  const handleSubmit = async (e) => {

    e.preventDefault(); 
    const {userEmail, password} = data;

    try {
      const {data} = await axios.post("http://localhost:3001/userinfo/register", {userEmail, password})

      if (data.error) {
        alert(data.error); 
      } else {
        setData({});
        const userEmail = data.user; 
        localStorage.setItem('userEmail', JSON.stringify(userEmail)); 

        alert('Account creation successful. Welcome!')
        navigate('/signedin');
      }
     
    } catch (error) {
      console.error('Error during POST request:', error);
    }
  }

  return (
    <Flex minH={"100vh"} minW={"100vw"} bg={"#DADB4D"} align={'center'} justify={'center'}>
      <Box bg={'white'} border={"3px solid black"} borderRadius={25} width={"35vw"} height={"auto"} textAlign={'center'}>
        <Text mt={75} fontSize={45} color={'black'}>Create an Account</Text>
        <form onSubmit={handleSubmit}>
          <FormControl mb={25} mt={80} isRequired>
            <Input type="email" placeholder="Email Address" value={data.userEmail} width={"27vw"} h={60} borderRadius={15} fontSize={15} onChange={(e) => setData({...data, userEmail: e.target.value})} />
          </FormControl>
          <FormControl mb={15} mt={25} isRequired>
            <Input type="password" placeholder="Password" value={data.password} width={"27vw"} h={60} borderRadius={15} fontSize={15} onChange={(e) => setData({...data, password: e.target.value})} />
          </FormControl>

          <Button type="submit" bg={"#5054B3"} color={"white"} borderRadius={15} width={"17vw"} h={60} border={"3px solid black"} marginBottom={"1%"} fontSize={20}>
            Submit
          </Button>
          <Text>
            Already have an account?{' '}
            <ChakraLink as={ReactRouterLink} to='/login'>
              Log in
            </ChakraLink>
          </Text>
        </form>
      </Box>

    </Flex>
  )
}

export default SignUp