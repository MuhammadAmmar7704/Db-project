import pool from "../server.js";

export const signup = async (req, res) => {
  try {
    
    const { username, password, email, student, university } = req.body;

    if (!username || !password || !email || !student || !university) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    
    const user_exists = "SELECT * FROM users where username=$1";
    const exists_query = await pool.query(user_exists, [username]);

    if (exists_query.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }
    
    const query = `INSERT INTO users 
        (username, password, email) VALUES ($1,$2,$3)
        RETURNING *`;
    const data = [username, password, email];

    const confirm = await pool.query(query, data);

    //adding user to students table if he is the student
    if (student == 'yes') {
    
    // get the university ID
    const uniResult = await pool.query("SELECT university_id FROM university WHERE name = $1", [university]);

    if (uniResult.rows.length === 0) {
      throw { error: "University not found" };
    }

    const uni_id = uniResult.rows[0].university_id; 
    
    const query2 = `INSERT INTO student (student_id, university_id) VALUES ($1, $2) RETURNING *`;
    const studentData = [confirm.rows[0].user_id, uni_id];

    const studentInsertResult = await pool.query(query2, studentData);
    
  }
    res.status(201).json(confirm.rows, studentInsertResult.rows);
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

export const deleteUser = async (req, res) => {
  try {
    const {username} = req.body;

    if (!username) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const query = "DELETE FROM users WHERE username = $1;"
    const data = [username];

    const confirm = await pool.query(query, data);
    
    res.status(200).json(confirm.rows);
  } catch (error) {
    res.send(error);
  }
};