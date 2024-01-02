const mongoose = require('mongoose')

const listingSchema = mongoose.Schema(
    {
        image: {
            type: String, 
            required: [true, "Please upload an image!"]
        }, 
        title: {
            type: String, 
            required: [true, "Please upload a title for the listing!"]
        }, 
        description: {
            type: String, 
            required: [true, "Please attach a description of the listing!"]
        }, 
        price: {
            type: Number, 
            required: [true, "Please set the listing price!"]
        }, 
        category: {
            type: String, 
            required: [true, "Please choose one or more applicable categories for the listing!"]
        }, 
        pickUpLocation: {
            type: String, 
            required: [true, "Please include a potential pick-up location!"]
        }, 
        contactInfo: {
            type: String, 
            required: [true, "Please include your contact information!"]
        },
        userWhoCreated: {
            type: String, 
            required: [true]
        }
    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Listing', listingSchema); 