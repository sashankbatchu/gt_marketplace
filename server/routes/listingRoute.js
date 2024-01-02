 const {Router} = require("express"); 
 const {getListings, 
   getUserListings,
    getSpecificListing, 
    updateListing, 
    deleteListing, 
    createListing} = require("../controllers/listingControllers")


 const router = Router(); 

 router.get("/get", getListings);    
 router.get("/getUserListings", getUserListings); 
 router.get("/get/:id", getSpecificListing); 
 router.put("/update/:id", updateListing); 
 router.delete("/delete/:id", deleteListing); 
 router.post("/create", createListing); 


 module.exports = router;  