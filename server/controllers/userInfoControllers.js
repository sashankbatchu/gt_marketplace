const userInfoModel = require('../models/userInfoModel');
const {hashPassword, comparePasswords} = require("../helpers/auth"); 

module.exports.saveUserInfo = async (req, res) => {
    try {
        const {userEmail, password} = req.body; 

        const exist = await userInfoModel.findOne({userEmail}); 
        if (exist) {
            return res.json({
                error: "This account exists already"
            })
        }

        const hashedPassword = await hashPassword(password); 

        const user = await userInfoModel.create({
            userEmail, 
            password: hashedPassword
        })

        return res.status(200).json({
            user: `${user.userEmail}`
        });
    } catch (error) {
        console.log(error);
    } 
}


module.exports.loginUser = async (req, res) => {

    try {
        const {userEmail, password} = req.body; 
        const user = await userInfoModel.findOne({userEmail}); 
        if (!user) {
            return res.json({
                error: "An account with this email does not exist!"
            })
        }


        const match = await comparePasswords(password, user.password);
        if (match) {
            res.json({
                user: `${user.userEmail}`
            });
        } 
        if (!match) {
            res.json({
                error: 'Incorrect password!'
            })
        }
    } catch (error) {
        console.log(error); 
    }
}

