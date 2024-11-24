import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import authRoutes from "./Routes/authRoutes.js";
import cookieParser from "cookie-parser";
import universityRoutes from "./Routes/universityRoutes.js";
import societyRoutes from "./Routes/societyRoutes.js";
import eventRoutes from "./Routes/eventRoutes.js";
import contestRoutes from "./Routes/contestRoutes.js";
import imageRoute from "./utils/uploadImage.js";

dotenv.config();
const { Pool } = pkg;
const app = express();


// Corrected use of cors
//app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());

//set this from your .env environment, yours may differ
// const connectionString = process.env.PORTDB;
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

//done
app.use("/api/auth", authRoutes);

//one thing needed in updation, deletion, : need to add authentication
app.use("/api/university", universityRoutes);

//done : may add authentication for who is accessing
app.use("/api/society", societyRoutes);

//done : may add authentication for who is accessing
app.use("/api/event", eventRoutes);

//underdevelopment
app.use("/api/contest", contestRoutes);


app.use("/image", imageRoute);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default pool;
