const listingModel = require('../models/listingModel');

module.exports.getListings = async (req, res) => {
    try {
        const listings = await listingModel.find({});
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getUserListings = async (req, res) => {
    try {
        const listings = await listingModel.findOne({userEmailToExport});
        res.status(200).json(listings); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getSpecificListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await listingModel.findById(id);
        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.createListing = async (req, res) => {
    try {
        const {listingToAdd} = req.body; 
        const listing = await listingModel.create(listingToAdd);
        res.status(200).json(listing);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

module.exports.updateListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await listingModel.findByIdAndUpdate(id, req.body);
        if (!listing) {
            res.status(404).json({ message: `cannot find any listing with ID: ${id}` });
        }
        const updatedListing = await listingModel.findById(id);
        res.status(200).json(updatedListing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.deleteListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await listingModel.findByIdAndDelete(id);
        if (!listing) {
            res.status(404).json({ message: `cannot find any listing with ID: ${id}` });
        }
        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}