// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import Product from "../models/Product.js";

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // ✅ MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // ✅ Routes
// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     console.log("📦 /api/products called — returning", products.length, "products");
//     res.status(200).json(products);
//   } catch (err) {
//     console.error("❌ Error fetching products:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // ✅ Status route (for quick checks)
// app.get("/api/status", (req, res) => {
//   console.log("✅ Backend is running properly.");
//   res.json({ message: "Server is running and connected to MongoDB!" });
// });

// // ✅ Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection (connect only once)
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
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/status", (req, res) => {
  res.json({ message: "Server is running and connected to MongoDB!" });
});

// ❌ Remove app.listen
// ✅ Export handler for Vercel
export default app;
