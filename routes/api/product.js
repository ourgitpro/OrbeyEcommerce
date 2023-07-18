const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  secureupload,
  creatProduct,
  creatVariant,
} = require("../../controllers/productController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file.originalname.split(".")[1]);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        `.${file.originalname.split(".")[1]}`
    );
  },
});

const upload = multer({ storage: storage });
router.post("/productcreate", secureupload, creatProduct);
router.post(
  "/variantcreate",
  secureupload,
  upload.single("image"),
  creatVariant
);
module.exports = router;
