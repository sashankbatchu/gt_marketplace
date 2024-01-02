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
import { SlClose } from "react-icons/sl";

const ListingTemplate = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    return (
        <>

            <Button width={"21vw"} height={"60vh"} margin={"3vw"} border={"3px solid black"} borderRadius={25} bg={'white'} onClick={onOpen} overflow={'hidden'}>
                <VStack flexDir={'column'} align={'flex-start'}>
                    <Image src={props.image} m={"3%"} />
                    <Flex mt={"2%"} align={'flex-start'} flexDir={'column'}>
                        <Text fontSize={20} mt={"2%"}>{props.title}</Text>
                        <Text>${props.price}</Text>
                        <Button type="submit" bg={"#5054B3"} color={"white"} borderRadius={15} width={100} height={30} border={"3px solid black"} mt={2} mb={2}>
                            More Info
                        </Button>
                    </Flex>
                </VStack>
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent width="50%" mt={"10%"} >
                    <Button color={"white"} onClick={onClose} ml={"75%"} mt={"5%"} mr={"3%"} bg={'transparent'} >
                        <SlClose color='black' size={25} />
                    </Button>
                    <ModalBody>
                        <VStack flexDir={'column'} align={'center'}>
                            <ModalHeader fontSize={50}>{props.title}</ModalHeader>
                            <Image src={props.image} />
                            <Flex mt={"2%"} align={'flex-start'} flexDir={'column'}>
                                <Text fontSize={35} as={'b'} >${props.price}</Text>
                                <Text fontSize={15}>{props.description}</Text>
                                <Text>Contact: {props.contactInfo}</Text>
                                <Text mb={35}>Pick Up Location: {props.pickUpLocation}</Text>
                            </Flex>
                        </VStack>
                    </ModalBody>
                </ModalContent>

            </Modal>
        </>
    )
}

export default ListingTemplate