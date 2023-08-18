const Discount = require("../models/discountModel");

async function createDiscount(req, res) {
  let { percent, cash, flat, category, subCategory, product } = req.body;
  let discount = new Discount({
    percent,
    cash,
    flat,
    category,
    subCategory,
    product,
  });
  discount.save();
  res.send("Discount created successfully!");
}
const getAllDiscount = async (req, res) => {
  const data = await Discount.find({}).populate([
    "category",
    "subCategory",
    "product",
  ]);
  res.send(data);
};
const deleteDiscount = async (req, res) => {
  const { id } = req.params;
  const data = await Discount.findByIdAndDelete(id);
  res.send(data);
};
const fetchSingleDiscount = async (req, res) => {
    const { id } = req.params;
    const data = await Discount.findById(id).populate([
        "category",
        "subCategory",
        "product",
      ]);
    res.send(data);
  };
  const updateDiscount = async (req, res) => {
    const dicountId = req.params.id;
    const updateOptions = { new: true, runValidators: true, context: "query" };
    let updates = {};
    if (req.body.percent) {
      updates.percent = req.body.percent;
    }
    if (req.body.cash) {
      updates.cash = req.body.cash;
    }
    const updatedUser = await Discount.findByIdAndUpdate(
      dicountId,
      updates,
      updateOptions
    ).populate([
      "category",
      "subCategory",
      "product",
    ]);
    res.send(updatedUser);
  };

module.exports = {
  createDiscount,
  getAllDiscount,
  deleteDiscount,
  fetchSingleDiscount,
  updateDiscount
};
