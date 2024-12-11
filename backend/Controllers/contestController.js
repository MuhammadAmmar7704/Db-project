import pool from "../server.js";

export const addContest = async (req, res) => {
  const insertContestQuery =
    "INSERT INTO contest (event_id, contest_name, participants, description) VALUES ($1, $2, $3, $4)";

  try {
    const { event_id, contest_name, participants, description } = req.body;

    // Ensure event_id exists in the event table
    const eventExistsQuery = "SELECT * FROM event WHERE event_id = $1";
    const eventCheck = await pool.query(eventExistsQuery, [event_id]);

    if (eventCheck.rows.length === 0) {
      return res.status(400).json({ message: "Event does not exist. Enter a valid event ID." });
    }

    const data = [event_id, contest_name, participants, description];

    // Insert into the contest table
    await pool.query(insertContestQuery, data);
    res.status(201).json({ message: "Contest added successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Failed to add contest", error: error.message });
  }
};

export const deleteContest = async (req, res) => {
  const query = "DELETE FROM contest WHERE contest_id = $1";

  try {
    const { contest_id } = req.body;

    // Delete contest by contest_id
    await pool.query(query, [contest_id]);
    res.status(201).json({ message: "Contest deleted successfully", contest_id });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contest", error: error.message });
  }
};

export const getContestsByEventId = async (req, res) => {
  const query = "SELECT * FROM contest WHERE event_id = $1";

  try {
    const { id } = req.params;

    // Get all contests by event_id
    const result = await pool.query(query, [id]);
    res.status(200).json({ message: "Fetched contests successfully", contests: result.rows });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contests", error: error.message });
  }
};


export const register = async (req, res) => {
    const insertRegistrationQuery =
      "INSERT INTO registration (contest_id, user_id) VALUES ($1, $2)";
  
    try {
      const { contest_id, user_id } = req.body;
  
      // Check if the contest exists in the `contest` table
      const contestExistsQuery = "SELECT * FROM contest WHERE contest_id = $1";
      const contestCheck = await pool.query(contestExistsQuery, [contest_id]);
      if (contestCheck.rows.length === 0) {
        return res.status(400).json({ message: "Contest does not exist. Enter a valid contest ID." });
      }
  
      // Check if the user exists in the `users` table
      const userExistsQuery = "SELECT * FROM users WHERE user_id = $1";
      const userCheck = await pool.query(userExistsQuery, [user_id]);
      if (userCheck.rows.length === 0) {
        return res.status(400).json({ message: "User does not exist. Enter a valid user ID." });
      }
  
      // Insert into the registration table
      const data = [contest_id, user_id];
      await pool.query(insertRegistrationQuery, data);
  
      res.status(201).json({ message: "Registration added successfully", data });
    } catch (error) {
      res.status(500).json({ message: "Failed to add registration", error: error.message });
    }
  };
  

  export const countRegistration = async (req, res) => {
    const countRegistrationQuery =
      "SELECT COUNT(*) AS total FROM registration WHERE contest_id = $1";
      try {
        const { contest_id } = req.body;
      
      // Validate input
      if (!contest_id) {
        return res.status(400).json({ message: "Contest ID is required." });
      }
  
      const result = await pool.query(countRegistrationQuery, [contest_id]);
  
      // Extract the count from the query result
      const totalRegistrations = result.rows[0]?.total || 0;
  
      res.status(200).json({ message: "Count fetched successfully", count: totalRegistrations });
    } catch (error) {
      res.status(500).json({ message: "Failed to count registrations", error: error.message });
    }
  };
  

  export const getContest = async (req, res) => {
    const query = "SELECT * FROM contest WHERE contest_id = $1";
  
    try {
      const { id } = req.params; // Get contest_id from route parameters
      // Fetch contest by contest_id
      const result = await pool.query(query, [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Contest not found" });
      }
  
      res.status(200).json({ message: "Got contest", contest: result.rows[0] });
    } catch (error) {
      res.status(500).json({ message: "Failed to get contest", error: error.message });
    }
  };
  