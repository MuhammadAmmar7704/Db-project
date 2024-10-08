
import pool from '../server.js';

//miscellaneous functions ___________
const createUsersTable = async () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
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
        //const result = await pool.query(createTableQuery);

        //console.log('Table creation result:', result);
        
        
        const query = `INSERT INTO users 
        (username, password, email) VALUES ($1,$2,$3)
        RETURNING *`;
        const data = [req.body.username, req.body.password, req.body.email];

        await pool.query(query, data);

        //console.log(data);
        res.json(data);
    } catch (error) {
        res.send(error);


    }
    
}