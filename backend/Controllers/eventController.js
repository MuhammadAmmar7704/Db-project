import pool from "../server.js";


export const addEvent = async (req, res) => {
    const getSocietyIdQuery = "SELECT society_id FROM society WHERE name = $1";
    const insertEventQuery = "INSERT INTO event (event_name, society_id) VALUES ($1, $2)";

    try {
        const result = await pool.query(getSocietyIdQuery, [req.body.society_name]);

        if (!result.rows[0]) {
            return res.status(400).json({ message: 'Society does not exist. Enter a valid society' });
        }

        const society_id = result.rows[0].society_id;
        const data = [req.body.event_name, society_id];

        await pool.query(insertEventQuery, data);
        res.status(201).json({ message: "Event added successfully", data });
    } catch (error) {
        res.status(500).json({ message: "Failed to add event", error: error.message });
    }
};


export const updateEvent = async (req, res) => {
    
    const query = "UPDATE Event SET event_name = $1 WHERE society_id = $2 AND event_name = $3";
    const getSocietyIdQuery = "SELECT society_id FROM society WHERE name = $1";
    
    try {
        const result = await pool.query(getSocietyIdQuery, [req.body.society_name]);

        if (!result.rows[0]) {
            throw new error('Society does not exist. Enter a valid society' );
        }

        const society_id = result.rows[0].society_id;
        const data = [req.body.new_event_name, society_id, req.body.event_name];

        await pool.query(query, data);
        res.status(201).json({ message: "event updated successfully", Society: data });
    } catch (error) {
        
        res.status(500).json({ message: "Failed to update event", error });
    }
};

export const deleteEvent = async (req, res) => {
    const data = [
        req.body.event_name
    ];

    const query = "DELETE FROM event WHERE event_name = $1";

    try {
        await pool.query(query, data);
        res.status(200).json({ message: "event deleted successfully", Society: data });
    } catch (error) {
        
        res.status(500).json({ message: "Failed to delete event", error });
    }
};


export const getAllEvent = async (req, res) => {
    

    const query = "Select * FROM Event";

    
    try {
        const result = await pool.query(query);
        res.status(200).json({ message: "got all event successfully", Society: result.rows });
    } catch (error) {
        
        res.status(500).json({ message: "Failed to get all event", error });
    }
};