import pool from "../server.js";


export const addEvent = async (req, res) => {
    const getSocietyIdQuery = "SELECT society_id FROM society WHERE society_id = $1";
    const insertEventQuery =
      "INSERT INTO event (event_name, society_id, image_url, event_date) VALUES ($1, $2, $3, $4)";
      try {
        const result = await pool.query(getSocietyIdQuery, [req.body.society_id]);
        
        if (!result.rows[0]) {
          return res.status(400).json({ message: "Society does not exist. Enter a valid society" });
        }
        
        const { event_name, image_url, event_date, society_id } = req.body;
        const data = [event_name, society_id, image_url, event_date];
        
      await pool.query(insertEventQuery, data);
      res.status(200).json({ message: "Event added successfully", data });
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
        req.body.event_id
    ];

    const query = "DELETE FROM event WHERE event_id = $1";

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
      const query = "SELECT E.*, S.name AS society_name, U.name AS university_name, U.university_id \
       FROM Event E JOIN society S ON S.society_id = E.society_id JOIN university U ON U.university_id = S.university_id WHERE event_id = $1;";
      const result = await pool.query(query, [id]);
      res.status(200).json({ message: "got event successfully", event: result.rows });
  } catch (error) {
      
      res.status(500).json({ message: "Failed to get event", error });
  }
};

export const getEventOfUni = async (req, res) => {
  const { university_id } = req.params;

  const query = `
    SELECT e.*
    FROM event e
    INNER JOIN society s ON e.society_id = s.society_id
    WHERE s.university_id = $1;
  `;

  try {
    const result = await pool.query(query, [university_id]);
    res.status(200).json({ events: result.rows });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events", error });
  }
}