
const createUsersTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          user_id SERIAL PRIMARY KEY,
          username VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          email VARCHAR(100) UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
    return createTableQuery;
};

const createUniversityTable = async () => {
    const createTableQuery = `
            CREATE TABLE IF NOT EXISTS university (
            university_id SERIAL PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL,
            phone VARCHAR(20) NOT NULL,
            address VARCHAR(100) NOT NULL,
            admin_id INTEGER UNIQUE,
            FOREIGN KEY(admin_id) REFERENCES users(user_id)
            );
        `;
    return createTableQuery;
};


const createSocietyTable = async () => {
  const createTableQuery = `
          CREATE TABLE IF NOT EXISTS society   (
          society_id SERIAL PRIMARY KEY,
          name VARCHAR(100) UNIQUE NOT NULL,
          university_id INTEGER NOT NULL,
          admin_id INTEGER UNIQUE,
          FOREIGN KEY(university_id) REFERENCES university(university_id) ON DELETE CASCADE,
          FOREIGN KEY(admin_id) REFERENCES users(user_id)
          );
      `;
  return createTableQuery;
};

const createTables = async (p) => {
    try {
        const userTableQuery = await createUsersTable();
        const universityTableQuery = await createUniversityTable();
        const societyTableQuery = await createSocietyTable();

        await p.query(userTableQuery);
        await p.query(universityTableQuery);
        await p.query(societyTableQuery);
    } catch (error) {
        console.error("Error creating tables:", error);
    }
}

export default createTables;






/* reject this

const createRequestsTable = async () => {
    /*
      FORMATS JSON:-
  
      for add University: 
      {
        entity_name : xyz,
        admin       : user,
        location    : xyz,
        phone       : abc
      }
      
      for add Society: 
      {
        entity_name : xyz;
        admin       : user;
      }
  
      for add Member(in society): 
      {
        user_id     : xyz;
        society     : name;
      }
  
      
      for update University: 
      {
        entity_name : xyz,
        update1       : newvalue1,
        update2       : newvalue2,
        .
        .

        updatex       : newvaluex,
      }
      
      for update Society: 
      {
        entity_name : xyz,
        admin       : user
      }
  
      
      for delete University: 
      {
        entity_name : xyz;
        admin       : user;
      }
      
      for delete Society: 
      {
        entity_name : xyz;
        admin       : user;
      }
  
      for delete Member(in society): 
      {
        user_id     : xyz;
        society     : name;
      }
    / 
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS request (
  
          user_id, --will add auth-token here for verification
        
          request_type VARCHAR(10) CHECK (request_type IN ('add', 'update', 'delete')),
          request_to VARCHAR(10) CHECK (request_type IN ('admin', 'university', 'society')),
          
          entity_in_question NOT NULL. -- what to create update or delete
  
          details JSONB NOT NULL, -- json type
  
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

          status VARCHAR(10) CHECK (request_type IN ('approved', 'rejected', 'pending')
        );
      `;
    return createTableQuery;
  };
  
  */