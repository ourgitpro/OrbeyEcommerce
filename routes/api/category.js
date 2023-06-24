const express = require("express");
const router = express.Router();
const {
  createCategoryController,
  categoryStatusController,
  createSubCategoryController,subCategoryStatusController ,getAllCategory,
  getAllSubCategory
} = require("../../controllers/categoryController");
router.post("/createcategory", createCategoryController);
router.post("/statuscategory", categoryStatusController);
router.post("/createSubcategory",  createSubCategoryController);
router.post("/statusSubcategory", subCategoryStatusController);
router.get("/getallcategory", getAllCategory);
router.get("/getallsubcategory", getAllSubCategory);

module.exports = router;
