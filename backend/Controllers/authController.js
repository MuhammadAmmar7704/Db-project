import pool from "../server.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {

    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    let user_exists = "SELECT * FROM users where username=$1 ";
    let exists_query = await pool.query(user_exists, [username]);

    if (exists_query.rows.length > 0) {
      return res.status(409).json({ error: "Username already exists" });
    }


    user_exists = "SELECT * FROM users where email=$1 ";
    exists_query = await pool.query(user_exists, [email]);

    if (exists_query.rows.length > 0) {
      return res.status(409).json({ error: "email already exists" });
    }

    // hashing password, to make it secure
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `INSERT INTO users 
        (username, password, email) VALUES ($1,$2,$3)
        RETURNING *`;
    const data = [req.body.username, hashedPassword, req.body.email];

    // adding in database
    const confirm = await pool.query(query, data);

    const { rows } = confirm;
    const [user] = rows;
    const {
      user_id: id,
      email: user_email,
      password: user_password,
      username: user_username,
    } = user;

    // authentication (user token)

    if (confirm.rows.length > 0) {
      generateTokenAndSetCookie(id, res);

      res.status(201).json({
        id: id,
        username: user_username,
      });
    }

  } catch (error) {
    res.send(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const query =
      "SELECT * FROM users u join roles r on u.role_id = r.role_id WHERE email = $1";
    const data = [email];

    const confirm = await pool.query(query, data);
    const { rows } = confirm;

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const [user] = rows;
    const {
      user_id: id,
      email: user_email,
      password: user_password,
      username: user_username,
      role_name: role_name,
    } = user;

    const isPasswordCorrect = await bcrypt.compare(password, user_password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    generateTokenAndSetCookie(id, res);
    return res.status(200).json({ id, user_username, user_email, role_name });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "strict", 
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const {user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    
    const query = "DELETE FROM users WHERE user_id = $1;";
    const data = [user_id];
    
    
    const confirm = await pool.query(query, data);
    res.status(200).json({ message: `${user_id} has been removed` });
  } catch (error) {
    res.status(500).json({message: 'user not deleted'});
  }
};
export const getCurrentUser = async (req, res) => {
  try {
    const { user_id, role_id } = req.user; // Assuming req.user is populated by protectRoute middleware

    const query =
      "SELECT u.user_id, u.username, u.email, r.role_name FROM users u join roles r ON r.role_id = u.role_id WHERE u.user_id = $1";
    const values = [user_id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];
    res.json(user);
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const query = `
      SELECT u.user_id, u.username, u.email, r.role_name 
      FROM users u
      JOIN roles r ON r.role_id = u.role_id
      ORDER BY u.user_id ASC
    `;

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    res.json({ users: result.rows });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
