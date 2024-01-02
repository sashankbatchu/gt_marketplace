const mongoose = require("mongoose")
const Config = require("./config")

const Connect = async () => {
    mongoose.set("strictQuery", false)
    mongoose.connect(Config.MODEL_URI)
        .then(() => {
            console.log('Connected to mongodb')
        }).catch((error) => {
            console.log(error)
        })

}

module.exports = Connect;  