const emailValidation = require("../helpers/emailValidation");
const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
let loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email) {
    return res.send({ error: "Enter Email" });
  } else if (!emailValidation(email)) {
    return res.send({ error: "Enter a valid Email" });
  } else if (!password) {
    return res.send({ error: "Enter Password" });
  } else {
    let isEmailExist = await User.find({ email });
    if (isEmailExist.length > 0) {
      bcrypt
        .compare(password, isEmailExist[0].password)
        .then(function (result) {
          if (result) {
            res.send({
              success: "Login Successfully",
              fullName: isEmailExist.fullName,
              email: isEmailExist.email,
            });
          } else {
            res.json({ error: "Password not Match" });
          }
        });
    } else {
      res.json({ error: "Email not Match" });
    }
  }
};
module.exports = loginController;
