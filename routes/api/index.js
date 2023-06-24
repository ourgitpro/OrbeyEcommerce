const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.js");
const categoryRoutes = require("./category.js");
const productRoutes = require("./product.js")
const merchantRoutes = require("./merchant.js")
router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);
router.use("/product",productRoutes)
router.use("/merchant",merchantRoutes)
//localhost:8000/auth

 module.exports = router;