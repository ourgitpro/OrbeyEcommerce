const express = require("express");
const router = express.Router();
const Registration = require("../../controllers/registrationController");
const Login = require("../../controllers/loginController");
const OtpMatch = require("../../controllers/emailVarificationOtpMatch");
router.post("/registration", Registration);
router.post("/login", Login);
router.post("/emailVarificationOtpMatch", OtpMatch);
module.exports = router;
