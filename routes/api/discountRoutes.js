const express = require("express");
const router = express.Router();
const {
    createDiscount, getAllDiscount,deleteDiscount,fetchSingleDiscount,  updateDiscount
  } = require("../../controllers/discountController");
  router.post("/createDiscount", createDiscount);
  router.get("/getAllDiscount", getAllDiscount);
  router.delete("/:id", deleteDiscount);
  router.get("/:id", fetchSingleDiscount);
  router.put("/:id", updateDiscount);

module.exports = router;