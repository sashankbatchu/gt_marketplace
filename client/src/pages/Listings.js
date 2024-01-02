import React, { useEffect } from "react";
import {
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Text,
  Box,
  Spacer,
  VStack,
  Image
} from "@chakra-ui/react";
import axios from "axios";
import UserListingTemplate from "../components/UserListingTemplate";
import { IoAdd, IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { SlTrash } from "react-icons/sl";
import { VscEdit } from "react-icons/vsc";

const Listings = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const [image, setImage] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [category, setCategory] = React.useState("");
  const [pickUpLocation, setPickUpLocation] = React.useState("");
  const [contactInfo, setContactInfo] = React.useState("");

  const [userWhoCreatedSaved, setUserWhoCreatedSaved] = React.useState(JSON.parse(localStorage.getItem('userEmail')));

  const [removeListingState, setRemoveListingState] = React.useState(false);
  const changeRoute = () => {
    navigate("/signedin")
  }

  const handleSubmit = async (e) => {
    console.log(removeListingState);
    const postData = {
      image,
      title,
      description,
      price,
      category,
      pickUpLocation,
      contactInfo,
      userWhoCreated: userWhoCreatedSaved
    };

    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/listings/create', { listingToAdd: postData }).then((res) => {
        setImage("")
        setTitle("");
        setDescription("");
        setPrice(0);
        setCategory("");
        setPickUpLocation("");
        setContactInfo("");
        setUserWhoCreatedSaved("");
        setRemoveListingState(!removeListingState);

        window.location.reload();
      })

    } catch (error) {
      console.error('Error during POST request:', error);
    }
  }


  //from viewuserlisting
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [selectedListing, setSelectedListing] = React.useState(false);
  const [toUpdateListing, setToUpdateListing] = React.useState([]);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/listings/get");
    setData(response.data);
    setFilteredData(response.data.filter((listing) => listing.userWhoCreated === userWhoCreatedSaved))
  }

  useEffect(() => {
    try {
      // const fetchData = async () => {
      //   const response = await axios.get("http://localhost:3001/listings/get");
      //   setData(response.data);
      //   setFilteredData(response.data.filter((listing) => listing.userWhoCreated === userWhoCreatedSaved))
      // }
      fetchData();
    } catch (error) {
      console.log(error.message);
    };
  }, [removeListingState]);

  const removeListing = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/listings/delete/${id}`);

      setData((prevData) => prevData.filter((listing) => listing._id !== id));
      setFilteredData((prevFilteredData) => prevFilteredData.filter((listing) => listing._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateListing = async (id) => {
    // Find the listing in the data array based on its id
    const listingToUpdate = data.find((listing) => listing._id === id);
   // setSelectedListing(!selectedListing);
    setToUpdateListing(listingToUpdate);
    // Set the listing details in the state to prefill the form fields
    setImage(listingToUpdate.image || "");
    setTitle(listingToUpdate.title || "");
    setDescription(listingToUpdate.description || "");
    setPrice(listingToUpdate.price || 0);
    setCategory(listingToUpdate.category || "");
    setPickUpLocation(listingToUpdate.pickUpLocation || "");
    setContactInfo(listingToUpdate.contactInfo || "");

  };

  const updateListingButton = async (e) => {
    e.preventDefault();

    const postData = {
      image,
      title,
      description,
      price,
      category,
      pickUpLocation,
      contactInfo,
      userWhoCreated: userWhoCreatedSaved
    };
    console.log(postData);

    const id = toUpdateListing._id;

    try {
      await axios.put(`http://localhost:3001/listings/update/${id}`, postData).then((res) => {
        setImage("")
        setTitle("");
        setDescription("");
        setPrice(0);
        setCategory("");
        setPickUpLocation("");
        setContactInfo("");
        setUserWhoCreatedSaved("");
        setRemoveListingState(!removeListingState);
        setToUpdateListing("");

        window.location.reload();
      })

    } catch (error) {
      console.error('Error during POST request:', error);
    }

    onClose();
  }

  return (
    <Flex backgroundColor={"#DADB4D"} flexDirection={"column"} minHeight="100vh">
      <Button
        width={200}
        height={60}
        borderRadius={25}
        bg={"transparent"}
        color={"white"}
        border="none"
        marginBottom={20}
        mt={65}
        fontSize={20}
        marginLeft={30}
        onClick={changeRoute}
      >
        <IoArrowBack size={40} /> Return Home
      </Button>
      <Button
        width={200}
        height={60}
        borderRadius={25}
        bg={"#5054B3"}
        color={"white"}
        fontSize={15}
        border="3px solid black"
        onClick={() => {
          setSelectedListing(false);
          onOpen();
        }}
        marginLeft={50}>
        <Flex marginRight={5} alignItems={"center"} >
          <Text> Create new listing </Text>
          <Spacer />
          <IoAdd />
        </Flex>
      </Button>

      {/* <ViewUserListings removeListingState={removeListingState}/> */}
      <Box bg={"#DADB4D"} minH="100vh" w="100vw" >
        {filteredData.map(listingItem => {
          return (
            <Button width={"21vw"} height={"80vh"} margin={"3vw"} border={"3px solid black"} borderRadius={25} bg={'white'} overflow={'hidden'}>
              <VStack flexDir={'column'} align={'flex-start'} spacing={1} >
                <Flex flexDir={'row'} >
                  <Button mt={"5%"} mb={"5%"} bg={'transparent'} border={'none'} onClick={() => {
                    setSelectedListing(true);
                    onOpen();
                    updateListing(listingItem._id)
                    }}> <VscEdit size={20} /></Button>
                  <Button mt={"5%"} mb={"5%"} bg={'transparent'} border={'none'} onClick={() => removeListing(listingItem._id)}> <SlTrash size={20} /></Button>

                </Flex>

                <Image src={listingItem.image} />
                <Text fontSize={15}>Item Price: ${listingItem.price}</Text>
                <Text fontSize={15}>Item Title: {listingItem.title}</Text>
                <Text fontSize={15}>Item Description: {listingItem.description}</Text>
                <Text fontSize={15}>Contact Info: {listingItem.contactInfo}</Text>
                <Text fontSize={15} mb={30}>Pick Up Location: {listingItem.pickUpLocation}</Text>

              </VStack>
            </Button>
          )
        })}
      </Box>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width="100vw"
          position="fixed"
          top="0"
          left="0"
          bg="rgba(0,0,0,0.5)"
        >
          <ModalContent width="50%" position="relative" top="25%" left="25%" right="25%" bg="white" marginTop={"100"} paddingLeft={50}>
            <ModalHeader bg={"white"} mt={25} fontSize={30}>
              {selectedListing ? "Update your listing!" : "Create your new listing!"}
            </ModalHeader>
            <ModalBody>
              <Flex bg={"white"}>
                <form onSubmit={handleSubmit}>
                  <FormControl mb={25} mt={25} isRequired>
                    <FormLabel htmlFor="image">Image</FormLabel>
                    <Input type="text" placeholder="Enter an image URL" value={image} onChange={(e) => setImage(e.target.value)} />
                  </FormControl>
                  <FormControl mb={25} isRequired>
                    <FormLabel htmlFor="itemTitle">Item Title</FormLabel>
                    <Input type="text" placeholder="Enter your item's title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </FormControl>
                  <FormControl mb={25} isRequired>
                    <FormLabel htmlFor="itemDescription">Item Description</FormLabel>
                    <Input type="text" placeholder="Enter a description of the item" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </FormControl>
                  <FormControl mb={25} isRequired>
                    <FormLabel htmlFor="price">Price</FormLabel>
                    <Input type="number" placeholder="Enter a price" value={price} onChange={(e) => setPrice(e.target.value)} />
                  </FormControl>
                  <FormControl mb={25} isRequired>
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <Input type="text" placeholder="Choose as many categories as applicable" value={category} onChange={(e) => setCategory(e.target.value)} />
                  </FormControl>
                  <FormControl mb={25} isRequired>
                    <FormLabel htmlFor="pickUpLocation">Pick Up Location</FormLabel>
                    <Input type="text" placeholder="Enter a pick up location" value={pickUpLocation} onChange={(e) => setPickUpLocation(e.target.value)} />
                  </FormControl>
                  <FormControl mb={25} isRequired>
                    <FormLabel htmlFor="contactInfo">Contact Information</FormLabel>
                    <Input type="text" placeholder="Enter your contact information" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
                  </FormControl>
                  {selectedListing ?
                    <Button type="submit" bg={"#5054B3"} color={"white"} onClick={updateListingButton} borderRadius={15} width={100} height={30} border={"3px solid black"} marginBottom={"15%"}>
                      Update
                    </Button> :
                    <Button type="submit" bg={"#5054B3"} color={"white"} onClick={onClose} borderRadius={15} width={100} height={30} border={"3px solid black"} marginBottom={"15%"}>
                      Submit
                    </Button>
                  }
                </form>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Flex>
      </Modal>
    </Flex>
  );
};

// const ViewUserListings = (removeListingState) => {
//   const [data, setData] = React.useState([]);
//   const [filteredData, setFilteredData] = React.useState([]);
//   const userWhoCreatedSaved = JSON.parse(localStorage.getItem('userEmail'));

//   useEffect(() => {
//     try {
//       const fetchData = async () => {
//         const response = await axios.get("http://localhost:3001/listings/get");
//         setData(response.data);
//         setFilteredData(response.data.filter((listing) => listing.userWhoCreated === userWhoCreatedSaved))
//       }
//       fetchData();
//     } catch (error) {
//       console.log(error.message);
//     };
//   }, [removeListingState]);

//   const removeListing = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3001/listings/delete/${id}`);

//       setData((prevData) => prevData.filter((listing) => listing._id !== id));
//       setFilteredData((prevFilteredData) => prevFilteredData.filter((listing) => listing._id !== id));
//     } catch (error) {
//       console.log(error.message);
//     }
//   };


//   return (
//     <>
//       <Box bg={"#DADB4D"} minH="100vh" w="100vw" >
//         {filteredData.map(listingItem => {
//           return (
//             <Button width={250} height={"auto"} margin={"3vw"} border={"3px solid black"} borderRadius={25} bg={'white'} overflow={'hidden'}>
//               <VStack flexDir={'column'} align={'flex-start'} spacing={1} >
//                 <Flex flexDir={'row'} >
//                   <Button mt={"10%"} mb={"10%"} bg={'transparent'} border={'none'}> <VscEdit size={20} /></Button>
//                   <Button mt={"10%"} mb={"10%"} bg={'transparent'} border={'none'} onClick={() => removeListing(listingItem._id)}> <SlTrash size={20} /></Button>

//                 </Flex>

//                 <Image src={listingItem.image} />
//                 <Text fontSize={15}>Item Price: ${listingItem.price}</Text>
//                 <Text fontSize={15}>Item Title: {listingItem.title}</Text>
//                 <Text fontSize={15}>Item Description: {listingItem.description}</Text>
//                 <Text fontSize={15}>Contact Info: {listingItem.contactInfo}</Text>
//                 <Text fontSize={15} mb={30}>Pick Up Location: {listingItem.pickUpLocation}</Text>

//               </VStack>
//             </Button>
//           )
//         })}
//       </Box>
//     </>
//   )
// }

export default Listings;
