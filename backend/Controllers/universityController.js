import pool from "../server.js";

export const addUniversity = async (req, res) => {
    const data = [
        req.body.name,
        req.body.phone,
        req.body.address,
        req.body.admin_id // This id should be a user, should be authenticated
    ];

    const query = "INSERT INTO university (name, phone, address, admin_id) VALUES ($1, $2, $3, $4)";

    try {
        await pool.query(query, data);
        res.status(201).json({ message: "University added successfully", university: data });
    } catch (error) {
        
        res.status(500).json({ message: "Failed to add university", error });
    }
};

export const updateUniversity = async (req, res) => {
    const data = [
        req.body.university_id,
        req.body.name,
        req.body.phone,
        req.body.address,
        req.body.admin_id // This id should be a user, should be authenticated
    ];

    const query = "UPDATE university SET name = ($2), phone = ($3), address = ($4), admin_id = ($5) WHERE university_id = ($1);";

    try {
        await pool.query(query, data);
        res.status(201).json({ message: "University updated successfully", university: data });
    } catch (error) {
        
        res.status(500).json({ message: "Failed to update university", error });
    }
};

export const deleteUniversity = async (req, res) => {
    const data = [
        req.body.university_id
        //req.body.admin_id // This id should be a user, should be authenticated
    ];

    const query = "DELETE FROM university WHERE university_id = ($1);";

    try {
        await pool.query(query, data);
        res.status(200).json({ message: "University deleted successfully", university: data });
    } catch (error) {
        
        res.status(500).json({ message: "Failed to delete university", error });
    }
};


export const getAllUniversity = async (req, res) => {
    

    const query = "Select * FROM university;";

    
    try {
        const result = await pool.query(query);
        res.status(200).json({ message: "got all University successfully", university: result.rows });
    } catch (error) {
        
        res.status(500).json({ message: "Failed to get all university", error });
    }
};