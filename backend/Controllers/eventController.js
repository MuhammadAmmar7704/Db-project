import pool from "../server.js";


export const addEvent = async (req, res) => {
    const getSocietyIdQuery = "SELECT society_id FROM society WHERE name = $1";
    const insertEventQuery =
      "INSERT INTO event (event_name, society_id, image_url, event_date) VALUES ($1, $2, $3, $4)";
  
    try {
      const result = await pool.query(getSocietyIdQuery, [req.body.society_name]);
  
      if (!result.rows[0]) {
        return res.status(400).json({ message: "Society does not exist. Enter a valid society" });
      }
  
      const society_id = result.rows[0].society_id;
      const { event_name, image_url, event_date } = req.body;
      const data = [event_name, society_id, image_url, event_date];
  
      await pool.query(insertEventQuery, data);
      res.status(201).json({ message: "Event added successfully", data });
    } catch (error) {
      res.status(500).json({ message: "Failed to add event", error: error.message });
    }
  };
  


  export const updateEvent = async (req, res) => {
    const query =
      "UPDATE event SET event_name = $1, image_url = $2, event_date = $3 WHERE event_id = $4";
    
    try {
  
      const { event_name, image_url, event_date, event_id } = req.body;
      const data = [event_name, image_url, event_date, event_id];
  
      await pool.query(query, data);
      res.status(200).json({ message: "Event updated successfully", updatedData: data });
    } catch (error) {
      res.status(500).json({ message: "Failed to update event", error: error.message });
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
        res.status(200).json({ message: "got all event successfully", events: result.rows });
    } catch (error) {
        
        res.status(500).json({ message: "Failed to get all event", error });
    }
};

export const getEventbyId = async (req, res) => {
  try {
      const id = req.params.id;
      const query = "Select * FROM Event where event_id = $1";
      const result = await pool.query(query, [id]);
      res.status(200).json({ message: "got event successfully", event: result.rows });
  } catch (error) {
      
      res.status(500).json({ message: "Failed to get event", error });
  }
};