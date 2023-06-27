const mongoose = require("mongoose");
const { Schema } = mongoose;

const optionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  value: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  store: {
    type: Schema.Types.ObjectId,
    ref: "Store",
  },
  updated: {
    type: Date,
  },

  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Option", optionSchema);
