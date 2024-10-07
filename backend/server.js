import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import universityRoutes from "./Routes/universityRoutes.js";
import societyRoutes from "./Routes/societyRoutes.js";
import eventRoutes from "./Routes/eventRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
// app.get("/", (req, res) => {
// res.send("Hello Buddy!");
// });

dotenv.config();
const { Pool } = pkg;
const app = express();

app.arguments(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.connect((err) => {
  if (err) {
    console.log("Error connecting to database", err);
  } else {
    console.log("Connected to PostgreSQL Database");
  }
});

app.get("/", (req, res) => {
  res.send("Hello world from the backend");
});
app.use("/api/auth", authRoutes);
app.use("/api/universities", universityRoutes);
app.use("/api/societies", societyRoutes);
app.use("/api/events", eventRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.listen(5000, () => {
//   console.log("Server is running on the port 5000");
// });
