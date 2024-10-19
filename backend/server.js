import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
//import universityRoutes from "./Routes/universityRoutes.js";
//import societyRoutes from "./Routes/societyRoutes.js";
//import eventRoutes from "./Routes/eventRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import cookieParser from "cookie-parser";
//import requestRoutes from "./Routes/requestRoutes.js"; // this logic is removed for the moment
//import { password } from "pg/lib/defaults.js";
import universityRoutes from "./Routes/universityRoutes.js";
import societyRoutes from "./Routes/societyRoutes.js";
import eventRoutes from "./Routes/eventRoutes.js";

dotenv.config();
const { Pool } = pkg;
const app = express();

// Corrected use of cors
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//set this from your .env environment, yours may differ
const connectionString = process.env.PORTDB;
//const port = process.env.port;
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

//create tables
import createTables from "./tableCreation.js";
createTables(pool);

app.get("/", (req, res) => {
  res.send("Hello world from the backend");
});

//underdevelopment
app.use("/api/auth", authRoutes);

//one thing needed in updation, deletion, : need to add authentication
app.use("/api/university", universityRoutes);

//done : may add authentication for who is accessing
app.use("/api/society", societyRoutes);

//underdevelopment
app.use("/api/event", eventRoutes);

// ----------------------------------------------------

// get all users (for testing purpose)
app.use("/api/auth/all", async (req, res) => {
  try {
    const all = await pool.query("SELECT * from users");
    console.log(
      await pool.query(
        "SELECT table_schema, table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE'; "
      )
    );
    res.json(all.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------------------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default pool;
