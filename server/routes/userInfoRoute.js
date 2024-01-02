const {Router} = require("express"); 
const {saveUserInfo, loginUser} = require("../controllers/userInfoControllers"); 
const router = Router(); 


router.post("/register", saveUserInfo); 
router.post("/login", loginUser )

module.exports = router;