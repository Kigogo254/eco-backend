import mongoose from "mongoose";
import Product from "../models/Product.js";

let conn = null;

export default async function handler(req, res) {
  if (!conn) {
    conn = await mongoose.connect(process.env.MONGO_URI);
  }

  if (req.method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
