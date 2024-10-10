import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
//import universityRoutes from "./Routes/universityRoutes.js";
//import societyRoutes from "./Routes/societyRoutes.js";
//import eventRoutes from "./Routes/eventRoutes.js";
import authRoutes from "./Routes/authRoutes.js";

dotenv.config();
const { Pool } = pkg;
const app = express();

// Corrected use of cors
app.use(cors());
app.use(express.json());

//set this from your .env environment, yours may differ
const connectionString = process.env.PORTDB;
const pool = new Pool({
  connectionString,
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

//underdevelopment
app.use("/api/auth", authRoutes);

// ----------------------------------------------------

// get all users (for testing purpose)
app.use("/api/auth/all", async (req, res) => {
  try {
    const all = await pool.query("SELECT * from users");
    res.json(all.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------------------------------------------------

//later
// app.use("/api/universities", universityRoutes);
// app.use("/api/societies", societyRoutes);
// app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default pool;


