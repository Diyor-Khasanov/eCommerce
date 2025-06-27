const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    rating: { type: Number, required: true },
    comment: String,
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  countInStock: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
