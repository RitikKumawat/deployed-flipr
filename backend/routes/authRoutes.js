const expresss= require("express");
const { login, signUp } = require("../controllers/Auth");


const router = expresss.Router();


router.post("/login",login);
router.post("/signup",signUp);

module.exports = router;
