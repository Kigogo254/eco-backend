import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    currentPrice: Number,
    previousPrice: Number,
    countInStock: Number,
    rating: Number,
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
