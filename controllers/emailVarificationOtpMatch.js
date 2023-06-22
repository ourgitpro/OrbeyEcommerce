const User = require("../models/usersModel");
const emailVarificationOtpMatch = async (req, res) => {
  const { email, randomOtp } = req.body;
  const findOtp = await User.find({ email });
  if (findOtp.length > 0) {
    if (randomOtp == findOtp[0].randomOtp) {
      let removeOtpAfterMatch = await User.findOneAndUpdate(
        { email },
        { $unset: { randomOtp: "" } },
        { new: true }
      );
      res.json({ success: "Otp Match" });
    } else {
      res.json({ error: "Otp Not  Match" });
    }
  }
};
module.exports = emailVarificationOtpMatch;
