const User = require("../models/usersModel");
const Product = require("../models/productModel");
const Variant = require("../models/variantModel");
const secureupload = async (req, res, next) => {
  let userid = req.headers.authorization.split("@")[1];
  let password = req.headers.authorization.split("@")[2];

  if (!req.headers.authorization) {
    return res.send({ error: "authorization required" });
  }
  let user = await User.find({ _id: userid });
  if (user.length > 0) {
    if (password === process.env.MERCHANT_SECRET_KEY) {
      console.log(user[0].role);
      if (user[0].role === "merchant") {
        console.log("you can upload product");
        next();
      }
    } else {
      return res.send({ error: "you are not able to create product" });
    }
  } else {
    return res.send({ error: "you are not able to create account" });
  }
};
const creatProduct = (req, res) => {
  let { name, description, image, store } = req.body;

  let product = new Product({
    name,
    description,
    image,
    store,
  });
  product.save();
  res.send({ success: "product created successfully" });
};
const creatVariant = async (req, res) => {
  let { color, storage, ram, size, image, price, quantity, product } = req.body;
  //console.log(req.file.filename);
  let variant = new Variant({
    color,
    storage,
    ram,
    size,
    image: `${process.env.IMAGE_PATH}/uploads/${req.file.filename}`,
    price,
    quantity,
    product,
  });
  variant.save();
  await Product.findOneAndUpdate(
    { _id: variant.product },
    { $push: { variants: variant._id } },
    { new: true }
  );
  res.send({ success: "variant created successfully" });
};
module.exports = { secureupload, creatProduct, creatVariant };
