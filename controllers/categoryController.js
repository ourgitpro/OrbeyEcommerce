const User = require("../models/usersModel");
const Category = require("../models/categoryModel");
const SubCategory = require("../models/subcategoryModel");
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
const createSubCategoryController = async (req, res) => {
  const { name, description, category } = req.body;
  console.log(name, description, category);
  const duplicateSubCategory = await SubCategory.findOne({ name });

  if (duplicateSubCategory) {
    return res.send({ error: "Category already in use" });
  }
  let subCategory = new SubCategory({
    name,
    description,
    category,
  });
  await subCategory.save();
  await Category.findOneAndUpdate(
    { _id: subCategory.category },
    { $push: { subCategory: subCategory._id } },
    { new: true }
  );
  res.send({ success: "Category created successfully" });
};
const subCategoryStatusController = async (req, res) => {
  const { name, status } = req.body;
  console.log(name, status);
  if (status === "rejected" || status === "waiting") {
    const updateCategory = await SubCategory.findOneAndUpdate(
      { name },
      { $set: { isActive: false, status } },
      { new: true }
    );
    return res.send({ success: "Status update successfully" });
  } else if (status === "approved") {
    const updateCategory = await SubCategory.findOneAndUpdate(
      { name },

      { $set: { isActive: true, status } },
      { new: true }
    );
    return res.send({ success: "Status update successfully11" });
  }
};
const getAllCategory= async(req,res)=>{
    const data = await Category.find({}).populate("subCategory")
    res.send(data)
}
const getAllSubCategory= async (req,res)=>{
  const data = await SubCategory.find({}).populate("category")
  res.send(data)
}
module.exports = {
  createCategoryController,
  categoryStatusController,
  createSubCategoryController,
  subCategoryStatusController,
  getAllCategory,
  getAllSubCategory
};
