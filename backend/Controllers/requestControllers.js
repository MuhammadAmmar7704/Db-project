import pool from "../server.js";


// reject this for now

export const addRequest = async (req, res) => {

    try {
        
        const user_id = req.body.user_id;
        const req_type = req.body.request_type;
        const req_to = req.body.request_to;
        const entity_in_question = req.body.entity_in_question;
        const details = req.body.details;
        
        const query = "INSERT INTO REQUEST(user_id,request_type,request_to, entity_in_question,details) VALUES ($1,$2,$3,$4,$5)";
        
        const data = [user_id, req_type, req_to, entity_in_question, details];
        
        const res = await pool.query(query, data);
        
        console.log(res);
    } catch (error) {
        console.log(error);
        
    }
        
    }