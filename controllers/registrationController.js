const bcrypt = require("bcrypt");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const emailValidation = require("../helpers/emailValidation");
const sendEmail = require("../helpers/sendEmail");
const otpTemplate = require("../helpers/otpTemplate");
const User = require("../models/usersModel");

const registrationController = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res.send({ error: "Enter fullName" });
  } else if (!email) {
    return res.send({ error: "Enter Email" });
  } else if (!emailValidation(email)) {
    return res.send({ error: "Enter a valid Email" });
  } else if (!password) {
    return res.send({ error: "Enter Password" });
  } else {
    const duplicateEmail = await User.findOne({ email: email });

    if (duplicateEmail) {
      return res.send({ error: "Email already in use" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      const user = new User({
        fullName,
        email,
        password: hash,
      });

      user.save();

      const generator2 = aleaRNGFactory(Date.now());
      let randomNumber = generator2.uInt32().toString().substring(0, 4);
      let randomOtpStore = await User.findOneAndUpdate(
        { email },
        { $set: { randomOtp: randomNumber } },
        { new: true }
      );
      sendEmail(email, randomNumber, otpTemplate);
     // setTimeout(async () => {
        //console.log("Otp Send");
        //let randomOtpStore = await User.findOneAndUpdate(
        //  { email },
         // { $unset: { randomOtp: "" } },
         // { new: true }
        //);
     // }, 100000);

      res.send({
        success: "Registration Successfully",
        fullName: user.fullName,
        email: user.email,
      });
    });
  }
};

module.exports = registrationController;
