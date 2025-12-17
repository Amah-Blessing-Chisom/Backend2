import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./Route/user.js";
import ProductRoute from "./Route/product.js";
import cors from "cors";

dotenv.config();

const server = express();

// Middleware FIRST
server.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://backend2-1-h251.onrender.com",
];

server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Handle preflight requests
server.options("*", cors());

// Routes BEFORE listen
server.get("/", (req, res) => {
  res.send("Hello Blessing");
});

server.use("/api/user", userRoute);
server.use("/api/product", ProductRoute);

// Database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error(err));

// Start server LAST
server.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
