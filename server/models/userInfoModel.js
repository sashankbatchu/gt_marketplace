const mongoose = require('mongoose')

const userInfoSchema = mongoose.Schema(
    {
        userEmail: {
            type: String,
            required: [true, "Please provide a username"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Please provide a password"]
        }
    },
    {
        timestamps: true
    }
); 


module.exports = mongoose.model('userInfo', userInfoSchema);