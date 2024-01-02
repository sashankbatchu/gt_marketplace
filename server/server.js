const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config(); 
const listingRoutes = require("./routes/listingRoute");
const userInfoRoutes = require("./routes/userInfoRoute");
const cors = require("cors"); 

//app
const app = express()

//middleware
app.use(cors()); 
app.use(express.urlencoded({extended : false}))
app.use(express.json());  

//connect mongoDb database 
require("./database/database")();

//routes
app.use("/listings", listingRoutes);
app.use("/userinfo", userInfoRoutes); 

//activate listener
app.listen(3001, () => console.log(`Server is stated on http://localhost:3001`));

