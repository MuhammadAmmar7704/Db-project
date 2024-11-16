import pool from "../server.js";

export const addSociety = async (req, res) => {
    const data = [
      req.body.name,
      req.body.university_id,
      req.body.admin_id, // This id should be a user, should be authenticated
      req.body.image_url,
    ];
  
    const query =
      "INSERT INTO society (name, university_id, admin_id, image_url) VALUES ($1, $2, $3, $4)";
  
    // Query to check that society and admin should be in the same university
    const checkQuery =
      "SELECT university_id FROM users u JOIN student s ON u.user_id = s.student_id WHERE u.user_id = $1";
    try {
      const admin_uni_id = await pool.query(checkQuery, [req.body.admin_id]);
  
      if (!admin_uni_id.rows[0]) {
        return res.status(400).json({ message: "Invalid admin ID" });
      }
  
      if (req.body.university_id != admin_uni_id.rows[0].university_id) {
        throw {
          error: "Society Admin should be in the same university as society",
        };
      }
  
      await pool.query(query, data);
      res
        .status(200)
        .json({ message: "Society added successfully", Society: data });
    } catch (error) {
      res.status(500).json({ message: "Failed to add Society", error });
    }
  };
  

  export const updateSociety = async (req, res) => {
    const data = [
      req.body.society_id,
      req.body.name,
      req.body.university_id,
      req.body.admin_id, // This id should be a user, should be authenticated
      req.body.image_url,
    ];
  
    const query =
      "UPDATE society SET name = $2, university_id = $3, admin_id = $4, image_url = $5 WHERE society_id = $1";
  
    try {
      await pool.query(query, data);
      res
        .status(201)
        .json({ message: "Society updated successfully", Society: data });
    } catch (error) {
      res.status(500).json({ message: "Failed to update Society", error });
    }
  };
  

export const deleteSociety = async (req, res) => {
    const data = [
        req.body.society_id
    ];

    const query = "DELETE FROM society WHERE society_id = ($1);";

    try {
        await pool.query(query, data);
        res.status(200).json({ message: "Society deleted successfully", Society: data });
    } catch (error) {
        
        res.status(500).json({ message: "Failed to delete Society", error });
    }
};


export const getAllSociety = async (req, res) => {
    

    const query = "Select * FROM Society;";

    
    try {
        const result = await pool.query(query);
        res.status(200).json({ message: "got all Society successfully", Society: result.rows });
    } catch (error) {
        
        res.status(500).json({ message: "Failed to get all Society", error });
    }
};