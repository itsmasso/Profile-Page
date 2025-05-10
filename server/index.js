import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import userRoutes from "./Routes/UserRoutes.js";
import cookieParser from "cookie-parser";


const PORT = process.env.PORT || 3001;
connectDB();

const app = express();

app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://profile-page-wine.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log("Server is running.");
});
