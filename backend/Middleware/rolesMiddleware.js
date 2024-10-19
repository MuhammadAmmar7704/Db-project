import pool from "../server.js";

const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ error: "Unauthorized: User not authenticated" });
      }
      const { user_id } = req.user;
      const query = `
        SELECT r.role_name FROM roles r
        JOIN users u ON r.role_id = u.role_id
        where u.user_id = $1
      `;
      const values = [user_id];
      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return res.status(403).json({ message: "Forbidden: Role not Found!" });
      }
      const user_role = result.rows[0].role_name;
      if (user_role === requiredRole || user_role === "Super_Admin") {
        next();
      } else {
        return res.status(403).json({ message: "Forbidden: Access Denied!" });
      }
    } catch (error) {
      console.log("Error in checking roles middleware", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
export default checkRole;
