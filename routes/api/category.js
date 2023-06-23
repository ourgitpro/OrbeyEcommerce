const express = require("express");
const router = express.Router();
const {
  createCategoryController,
  categoryStatusController,
} = require("../../controllers/categoryController");
router.post("/createcategory", createCategoryController);
router.post("/statuscategory", categoryStatusController);

module.exports = router;
