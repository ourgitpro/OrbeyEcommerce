const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  emailVarified: {
    type: Boolean,
    default: false,
  },
  merchant: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "member",
    enum: ["admin", "member", "merchant"],
  },
  updated: {
    type: Date,
  },
  randomOtp: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  facebookId: {
    type: String,
  },
  linkedinId: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
