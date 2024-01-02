import React from 'react'
import SignedInNavBar from '../components/SignedInNavBar';
import HeroSection from '../components/HeroSection';
import { ChakraProvider } from '@chakra-ui/react';

const SignedInHome = () => {
  return (
    <ChakraProvider>
        <SignedInNavBar />
        <HeroSection />
    </ChakraProvider>

  )
}

export default SignedInHome