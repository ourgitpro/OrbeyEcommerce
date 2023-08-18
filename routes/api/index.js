const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.js");
const categoryRoutes = require("./category.js");
const productRoutes = require("./product.js")
const merchantRoutes = require("./merchant.js")
const discountRoutes= require("./discountRoutes.js")
router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);
router.use("/product",productRoutes)
router.use("/merchant",merchantRoutes)
router.use("/discount",discountRoutes)
//localhost:8000/auth

 module.exports = router;