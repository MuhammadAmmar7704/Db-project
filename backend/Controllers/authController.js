import pool from "../server.js";

//miscellaneous functions ___________
const createUsersTable = async () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  return createTableQuery;
};

///////////////

export const signup = async (req, res) => {
  try {
    const createTableQuery = await createUsersTable();
    const result = await pool.query(createTableQuery);

    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    // if (password !== confirmPassword) {
    //   return res.status(400).json({ error: "Passwords do not match" });
    // }

    const user_exists = "SELECT * FROM users where username=$1";
    const exists_query = await pool.query(user_exists, [username]);

    if (exists_query.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }
    // exists_query = await exists_query.json();
    // const { existing_username } = exists_query;
    // console.log(existing_username);
    // if (username === existing_username) {
    //   return res.status(400).json({ error: "User already exists" });
    // }
    //console.log('Table creation result:', result);

    const query = `INSERT INTO users 
        (username, password, email) VALUES ($1,$2,$3)
        RETURNING *`;
    const data = [req.body.username, req.body.password, req.body.email];

    const confirm = await pool.query(query, data);

    //console.log(data);
    // res.json();
    res.status(201).json(result.rows);
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

    const query = "SELECT * FROM users WHERE email = $1 and password = $2";
    const data = [email, password];

    const confirm = await pool.query(query, data);
    // const rows = { confirm };
    const { rows } = confirm;
    if (rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    // console.log(rows.json());
    const [user] = rows; // Access the first element of rows
    const {
      email: user_email,
      password: user_password,
      username: user_username,
    } = user; // Destructure properties from user
    // const { user_email, user_password, user_username } = confirm.rows[0].json();

    res.status(201).json({ user_email, user_username });
  } catch (error) {
    res.send(error);
  }
};
