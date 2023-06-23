const User = require("../models/usersModel");
const Category = require("../models/categoryModel");
const createCategoryController = async (req, res) => {
  const { name, description } = req.body;
  console.log(name, description);
  const duplicateCategory = await Category.findOne({ name });

  if (duplicateCategory) {
    return res.send({ error: "Category already in use" });
  }
  let category = new Category({
    name,
    description,
  });
  await category.save();
  res.send({ success: "Category created successfully" });
};
const categoryStatusController = async (req, res) => {
  const { name, status } = req.body;
  console.log(name, status);
  if (status === "rejected" || status === "waiting") {
    const updateCategory = await Category.findOneAndUpdate(
      { name },
      { $set: { isActive: false, status } },
      { new: true }
    );
    return res.send({ success: "Status update successfully" });
  } else if (status === "approved") {
    const updateCategory = await Category.findOneAndUpdate(
      { name },

      { $set: { isActive: true, status } },
      { new: true }
    );
    return res.send({ success: "Status update successfully11" });
  }
};
/*const categoryStatusController = async (req, res) => {
  const { name, status } = req.body;
  console.log(name, status);

  try {
    if (status === "rejected") {
      const updateCategory = await Category.findOneAndUpdate(
        { name },
        { status },
        { new: true }
      );

      if (updateCategory) {
        return res.send({ success: "Status updated successfully" });
      } else {
        return res.status(404).send({ error: "Category not found" });
      }
    } else {
      return res.status(400).send({ error: "Invalid status" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Failed to update category status" });
  }
};*/
/*const categoryStatusController = async (req, res) => {
  const { name, status } = req.body;
  console.log(name, status);
  
  if (status === "rejected" || status === "waiting") {
    const updateCategory = await Category.findOneAndUpdate(
      { name },
      { $set: { isActive: false, status } },
      { new: true }
    );
    
    if (updateCategory) {
      return res.send({ success: "Status update successfully" });
    } else {
      return res.status(404).send({ error: "Category not found" });
    }
  } else if (status === "approved") {
    const updateCategory = await Category.findOneAndUpdate(
      { name },
      { $set: { isActive: true, status } },
      { new: true }
    );
    
    if (updateCategory) {
      return res.send({ success: "Status update successfully" });
    } else {
      return res.status(404).send({ error: "Category not found" });
    }
  } else {
    return res.status(400).send({ error: "Invalid status" });
  }
};*/

module.exports = { createCategoryController, categoryStatusController };
