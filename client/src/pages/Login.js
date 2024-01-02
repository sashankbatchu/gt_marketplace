import React from 'react'
import {
  Flex,
  Text,
  Button,
  Stack,
  Box,
  Image,
  FormControl,
  Input,

} from "@chakra-ui/react";
import { Link as ChakraLink } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    userEmail: '',
    password: ''
  })


  const handleSubmit = async (e) => {
    e.preventDefault();
    const {userEmail, password} = data; 

    try {
      const {data} = await axios.post("http://localhost:3001/userinfo/login", { userEmail, password })

      if (data.error) {
        alert(data.error);
      } else {
        setData({})
        const userEmail = data.user; 
        localStorage.setItem('userEmail', JSON.stringify(userEmail)); 

        alert('Login Successful. Welcome!')
        navigate("/signedin");
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} bg={"#DADB4D"}  >
      <Flex p={8} flex={1} align={'center'} justify={'center'} width={"50vh"}>
        <Flex minH={"100vh"} minW={"100vw"} bg={"#DADB4D"} align={'center'} justify={'center'}>
          <Box bg={'white'} border={"3px solid black"} borderRadius={25} width={"35vw"} height={"auto"} textAlign={'center'} mb={150}>
            <Text mt={75} fontSize={45} color={'black'}>Welcome Back!</Text>
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
                Don't have an account?{' '}
                <ChakraLink as={ReactRouterLink} to='/signup'>
                  Sign up
                </ChakraLink>
              </Text>
            </form>
          </Box>

        </Flex>
      </Flex>
      <Flex flex={1} width={"50vh"}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.pexels.com/photos/2460457/pexels-photo-2460457.jpeg?auto=compress&cs=tinysrgb&w=800'
          }
        />
      </Flex>
    </Stack>
  )
}



export default Login
