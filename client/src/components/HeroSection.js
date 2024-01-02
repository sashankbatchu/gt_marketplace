import React from 'react'
import { useEffect } from 'react';
import {
    Flex,
    Text,
    Button,
    Stack,
    Box,
    SimpleGrid
} from "@chakra-ui/react";
import ListingTemplate from './ListingTemplate';
import axios from 'axios';

const HeroSection = () => {
    const [data, setData] = React.useState([]); 
    
    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await axios.get("http://localhost:3001/listings/get");
                setData(response.data); 
            }   
            fetchData(); 
 
        } catch (error) {
            console.log(error.message); 
        };
        console.log(data);
        
    }, []);
    
  return (
    <Box bg={"#DADB4D"} minH="100vh" minW="100vw" pl={"10%"} >
        {data.map(listingItem => {
            return (
                <ListingTemplate
                    image={listingItem.image}
                    title={listingItem.title}
                    description={listingItem.description}
                    price={listingItem.price}
                    category={listingItem.category}
                    pickUpLocation={listingItem.pickUpLocation}
                    contactInfo={listingItem.contactInfo}
                    />
            )
        })}
    </Box>

  )
}

export default HeroSection