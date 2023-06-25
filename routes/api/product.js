const express = require("express");
const router = express.Router();
const {
  secureupload,
  creatProduct,
} = require("../../controllers/productController");

router.post("/productUpload", secureupload, creatProduct);

module.exports = router;
