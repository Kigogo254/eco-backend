import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
if (!mongoose.connection.readyState) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}

// ✅ Routes
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    console.log("📦 /api/products called — returning", products.length, "products");
    res.status(200).json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Health check route
app.get("/api/status", (req, res) => {
  console.log("✅ Backend is running properly.");
  res.json({ message: "Server is running and connected to MongoDB!" });
});

// ✅ Export for Vercel
export default app;
