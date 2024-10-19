import pool from "../server.js";

const checkPermission = async (userID, permission) => {
  const query = `
        SELECT p.permission_name FROM users u
        JOIN roles r ON u.role_id = r.role_id
        JOIN role_permissions rp ON r.role_id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.permission_id
        where u.user_id = $1 AND p.permission_name = $2
    `;
  const result = await pool.query(query, [userID, permission]);
  return result.rows.length > 0;
};
const roleMiddleware = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const { user_id } = req.user;
      const validatePermission = await checkPermission(
        user_id,
        requiredPermission
      );
      if (!validatePermission) {
        return res.status(403).json({ error: "Forbidden" });
      }
      next();
    } catch (error) {
      console.log("Error checking permissions", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
export default roleMiddleware;
