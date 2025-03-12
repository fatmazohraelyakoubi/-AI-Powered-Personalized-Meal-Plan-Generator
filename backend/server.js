import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import mealRoutes from './routes/mealRoutes.js'
import authRoutes from "./routes/authRoutes.js"; // تأكد من صحة المسار

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/meal",mealRoutes);


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    
    // Start the server only after connecting to the database
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });
