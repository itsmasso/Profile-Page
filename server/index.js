import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import userRoutes from "./Routes/UserRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));
app.use(cookieParser());
app.use("/api/users", userRoutes); 
app.use("/uploads", express.static("uploads"));

app.listen(3001, () => {
  console.log("Server is running.");
});