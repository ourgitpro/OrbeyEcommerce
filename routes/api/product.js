const express = require("express");
const router = express.Router();
const {
  secureupload,
  creatProduct,
  creatVariant,
} = require("../../controllers/productController");

router.post("/productcreate", secureupload, creatProduct);
router.post("/variantcreate", secureupload, creatVariant);
module.exports = router;
