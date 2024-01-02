import React from 'react'
import {
    Flex,
    Text,
    Button,
    Stack,
    Box
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';


const SignedInNavBar = () => {
    return (
        <Box bg={"#DADB4D"}  display={'flex'}>
            <Flex minH={"40px"} align={'center'} >
                <Text fontSize={27} color={'white'} margin={5}>GT Marketplace</Text>
                <Stack
                    flex={{ base: 1, md: 0 }}
                    direction={'row'}
                    marginLeft={"80%"}
                    spacing={6}
                    position={"absolute"}
                >
                    <Link to="/listings">
                        <Button
                            borderRadius={25}
                            bg={"#5054B3"}
                            color={"white"}
                            fontSize={15}
                            border="3px solid black"
                            fontWeight={"bold"}
                        >
                            Listings
                        </Button>
                    </Link>
                    <Link to="/">
                        <Button
                            borderRadius={25}
                            bg={"#5054B3"}
                            color={"white"}
                            fontSize={15}
                            border="3px solid black"
                            fontWeight={"bold"}
                        >
                            Log out
                        </Button>
                    </Link>

                </Stack>
            </Flex>

        </Box>
    )
}

export default SignedInNavBar