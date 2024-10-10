import pool from "../server.js";

export const addSociety = async (req, res) => {
    const data = [
        req.body.name,
        req.body.university_id,
        req.body.admin_id // This id should be a user, should be authenticated
        
    ];

    const query = "INSERT INTO society (name, university_id,admin_id) VALUES ($1, $2, $3)";

    try {
        await pool.query(query, data);
        res.status(200).json({ message: "Society added successfully", Society: data });
    } catch (error) {
        
        res.status(500).json({ message: "Failed to add Society", error });
    }
};

export const updateSociety = async (req, res) => {
    const data = [
        req.body.society_id,
        req.body.name,
        req.body.university_id,
        req.body.admin_id // This id should be a user, should be authenticated
        
    ];


    const query = "UPDATE Society SET name = ($2), university_id = ($3), admin_id = ($4) WHERE society_id = ($1);";

    try {
        await pool.query(query, data);
        res.status(201).json({ message: "Society updated successfully", Society: data });
    } catch (error) {
        
        res.status(500).json({ message: "Failed to update Society", error });
    }
};

export const deleteSociety = async (req, res) => {
    const data = [
        req.body.society_id
        //req.body.admin_id // This id should be a user, should be authenticated
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