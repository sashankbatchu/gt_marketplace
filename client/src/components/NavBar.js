import React from 'react'
import {
    Flex,
    Text,
    Button,
    Stack,
    Box
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';


const NavBar = () => {
    return (
        <Box bg={"#DADB4D"}  display={'flex'} pt={"2%"} pl={"3%"}>
            <Flex minH={"40px"} align={'center'} >
                <Text fontSize={27} color={'white'}>GT Marketplace</Text>
                <Stack
                    flex={{ base: 1, md: 0 }}
                    direction={'row'}
                    spacing={6}
                    position={"absolute"}
                    pl={"80%"}
                >
                    <Link to="/signup">
                        <Button
                            borderRadius={25}
                            bg={"#5054B3"}
                            color={"white"}
                            fontSize={15}
                            border="3px solid black"
                            fontWeight={"bold"}
                        >
                            Sign Up
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button
                            borderRadius={25}
                            bg={"#5054B3"}
                            color={"white"}
                            fontSize={15}
                            border="3px solid black"
                            fontWeight={"bold"}
                        >
                            Log In
                        </Button>
                    </Link>

                </Stack>
            </Flex>



        </Box>
    )
}

export default NavBar