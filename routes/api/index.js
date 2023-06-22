const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.js");

router.use("/auth", authRoutes);
//localhost:8000/auth

 module.exports = router;