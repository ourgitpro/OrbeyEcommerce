const User = require("../models/usersModel");
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
  console.log("product create ");
};
module.exports = { secureupload, creatProduct};
