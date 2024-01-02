import React from 'react'
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import { ChakraProvider } from '@chakra-ui/react';

const Home = () => {
  return (
    <ChakraProvider>
        <NavBar />
        <HeroSection />
    </ChakraProvider>

  )
}

export default Home