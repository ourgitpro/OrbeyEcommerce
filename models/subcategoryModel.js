const mongoose = require("mongoose");
const { Schema } = mongoose;
const subCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  status: {
    type: String,
    default: "waiting",
    enum: ["waiting", "approved", "rejected"],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },

  updated: {
    type: Date,
  },

  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
