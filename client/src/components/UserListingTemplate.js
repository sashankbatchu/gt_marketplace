import React from 'react'
import {
    Flex,
    Text,
    Button,
    Stack,
    Box,
    Image,
    SimpleGrid,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Center
} from "@chakra-ui/react";
import { SlTrash } from "react-icons/sl";
import { VscEdit } from "react-icons/vsc";


const UserListingTemplate = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    const removeListing = (id) => {
        props.data = props.data
    }


    return (
        <Button width={250} height={"auto"} margin={"3vw"} border={"3px solid black"} borderRadius={25} bg={'white'} onClick={onOpen} overflow={'hidden'}>
            <VStack flexDir={'column'} align={'flex-start'} spacing={1} >
                <Flex flexDir={'row'} >
                <Button mt={"10%"} mb={"10%"} bg={'transparent'} border={'none'}> <VscEdit size={20} /></Button>
                <Button mt={"10%"} mb={"10%"} bg={'transparent'} border={'none'}> <SlTrash size={20} /></Button>

                </Flex>

                <Image src={props.image} />
                <Text fontSize={15}>Item Price: ${props.price}</Text>
                <Text fontSize={15}>Item Title: {props.title}</Text>
                <Text fontSize={15}>Item Description: {props.description}</Text>
                <Text fontSize={15}>Contact Info: {props.contactInfo}</Text>
                <Text fontSize={15} mb={30}>Pick Up Location: {props.pickUpLocation}</Text>

            </VStack>
        </Button>

    )
}

export default UserListingTemplate