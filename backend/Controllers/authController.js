import pool from "../server.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import createUsersTable from "../tableCreation.js";

export const signup = async (req, res) => {
  try {

    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    // will add later, to ensure no mistakes in adding password

    // if (password !== confirmPassword) {
    //   return res.status(400).json({ error: "Passwords do not match" });
    // }

    const user_exists = "SELECT * FROM users where username=$1";
    const exists_query = await pool.query(user_exists, [username]);

    if (exists_query.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
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

    // comment this, if you uncomment authentication
    // res.status(201).json({ id, user_username, user_email });
  } catch (error) {
    res.send(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role_id } = req.body;
    console.log({ email, password });
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const query =
      "SELECT * FROM users u join roles r on u.role_id = r.role_id WHERE email = $1";
    const data = [email];

    const confirm = await pool.query(query, data);
    const { rows } = confirm;

    if (rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const [user] = rows;
    const {
      user_id: id,
      email: user_email,
      password: user_password,
      username: user_username,
      role_name: role_name,
    } = user;

    // Check if the provided password matches the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user_password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    // If the password is correct, generate token and set cookie
    generateTokenAndSetCookie(id, res);
    // const newquery = "select r.role_name from roles r join users u on u.role_id = r.role_id where u.user_id = $1"
    // const newdata =[id];

    // const newConfirm = await pool.query(newquery, newdata);

    return res.status(201).json({ id, user_username, user_email, role_name });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const getDataquery = "SELECT FROM users WHERE username = $1";
    const query = "DELETE FROM users WHERE username = $1;";
    const data = [username];
    const getData = await pool.query(getDataquery, data);

    const { rows } = getData;

    if (rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const [user] = rows;
    const {
      user_id: id,
      email: user_email,
      password: user_password,
      username: user_username,
    } = user;

    const confirm = await pool.query(query, data);
    res.status(201).json({ message: `${username} has been removed` });
  } catch (error) {
    res.send(error);
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
