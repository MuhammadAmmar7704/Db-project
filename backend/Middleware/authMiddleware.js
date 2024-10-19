import jwt from "jsonwebtoken";
import pool from "../server.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized / No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized / Invalid token" });
    }

    const query =
      "SELECT user_id, username, email FROM users WHERE user_id = $1";
    // console.log(decoded.userID);
    const values = [decoded.userID];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = result.rows[0];
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
