import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import "colors";

dotenv.config();
const port = process.env.PORT || 8080;
const MongoDB_URL = process.env.MONGO_URL;
import morgan from "morgan";
import connectDB from "./config/db.js";

// Rest object
const app = express();
app.use(morgan("dev"));
app.use(express.json());

// Connection to MongoDB DataBase
connectDB();

// routes
app.use("/api/v1/auth", authRoutes);

// Rest Api
app.get("/", (req, res) => res.send({ messege: "Welcome" }));

// Listen App
app.listen(port, () =>
  console.log(`Server Listening on PORT : ${port}`.bgCyan.white)
);