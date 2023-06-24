const express = require("express");
const router = express.Router();
const { secureupload } = require("../../controllers/productController");

router.post("/productUpload", secureupload);
module.exports = router;
