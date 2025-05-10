import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import userRoutes from "./Routes/UserRoutes.js";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 3001;
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', 
  credentials: true,
}));
app.use(cookieParser());
app.use("/api/users", userRoutes); 
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log("Server is running.");
});