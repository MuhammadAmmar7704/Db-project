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
            FOREIGN KEY(admin_id) REFERENCES users(user_id) ON DELETE SET NULL
            );
        `;
  return createTableQuery;
};

const alterUniversityTable = () => {
  const alterSocietyTableQuery = `
  ALTER TABLE society 
    ADD CONSTRAINT fk_university FOREIGN KEY (admin_id) REFERENCES users (user_id)
    ON DELETE SET NULL;
  `;
  return alterSocietyTableQuery;
};
const createSocietyTable = async () => {
  const createTableQuery = `
          CREATE TABLE IF NOT EXISTS society   (
          society_id SERIAL PRIMARY KEY,
          name VARCHAR(100) UNIQUE NOT NULL,
          university_id INTEGER NOT NULL,
          admin_id INTEGER UNIQUE,
          image_url VARCHAR(255),
          FOREIGN KEY(university_id) REFERENCES university(university_id) ON DELETE CASCADE,
          FOREIGN KEY(admin_id) REFERENCES users(user_id) ON DELETE SET NULL
          );
      `;

  return createTableQuery;
};

const alterSocietyTable = () => {
  const alterSocietyTableQuery = `
  ALTER TABLE society 
    ADD CONSTRAINT fk_society FOREIGN KEY (admin_id) REFERENCES users (user_id)
    ON DELETE SET NULL;
  `;
  return alterSocietyTableQuery;
};

const createStudentTable = async () => {
  // there would be users who are not associated with university
  // separate table for students who are associated with any university
  // only students can head a society and student's Uni and society's Uni should be same
  const createTableQuery = `
          CREATE TABLE IF NOT EXISTS student   (
          student_id INTEGER,
          university_id INTEGER,
          FOREIGN KEY(university_id) REFERENCES university(university_id) ON DELETE CASCADE,
          FOREIGN KEY(student_id) REFERENCES users(user_id) ON DELETE CASCADE,
          PRIMARY KEY(university_id, student_id) 
          );
      `;
  return createTableQuery;
};
const createEventTable = async () => {
  // there would be users who are not associated with university
  // separate table for students who are associated with any university
  // only students can head a society and student's Uni and society's Uni should be same
  const createTableQuery = `
          CREATE TABLE IF NOT EXISTS event   (
          Event_id SERIAL PRIMARY KEY,
          event_name varchar(50) Unique NOT NULL,
          society_id INTEGER NOT NULL,
          date DATE NOT NULL,
          image_url VARCHAR(255),
          FOREIGN KEY(society_id) REFERENCES society(society_id) ON DELETE CASCADE
          );
      `;
  return createTableQuery;
};

const createContestTable = async () => {
  //contests
  const createTableQuery = `
          CREATE TABLE IF NOT EXISTS contest   (
          Contest_id SERIAL PRIMARY KEY,
          Event_id INTEGER NOT NULL,
          contest_name varchar(50) NOT NULL,
          participants INTEGER NOT NULL,
          description VARCHAR(100),
          FOREIGN KEY(Event_id) REFERENCES event(Event_id) ON DELETE CASCADE
          );
      `;
  return createTableQuery;
};

const createRegistrationTable = async () => {
  const createTableQuery = `
          CREATE TABLE IF NOT EXISTS registration (
          Contest_id INTEGER NOT NULL,
          user_id INTEGER NOT NULL,
          PRIMARY KEY (Contest_id, user_id),
          FOREIGN KEY (Contest_id) REFERENCES Contest(Contest_id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
      );
      `;
  return createTableQuery;
};

const createRolesTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS roles (
      role_id SERIAL PRIMARY KEY,
      role_name VARCHAR(50) UNIQUE NOT NULL
    );
  `;
  return createTableQuery;
};
const createPermissionsTable = async () => {
  const createPermissionsQuery = `
    CREATE TABLE IF NOT EXISTS permissions (
      permission_id SERIAL PRIMARY KEY,
      permission_name VARCHAR(50) UNIQUE NOT NULL
    );
  `;
  return createPermissionsQuery;
};

const insertDefaultRoles = async (p) => {
  const roles = [
    "Users",
    "Student",
    "Society_Head",
    "University_Head",
    "Super_Admin",
  ];
  for (const role of roles) {
    const query =
      "INSERT INTO roles (role_name) VALUES ($1) ON CONFLICT (role_name) DO NOTHING";
    await p.query(query, [role]);
  }
};
const createRolePermissionsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS role_permissions (
      role_id INTEGER NOT NULL,
      permission_id INTEGER NOT NULL,
      FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
      FOREIGN KEY (permission_id) REFERENCES permissions(permission_id) ON DELETE CASCADE,
      PRIMARY KEY (role_id, permission_id)
    );
  `;
  return createTableQuery;
};
const insertDefaultPermissions = async (p) => {
  const permissions = [
    "create_event",
    "remove_event",
    "update_event",
    "assign_society_head",
    "create_society",
    "update_society",
    "remove_society",
    "create_university",
    "update_university",
    "remove_university",
    "assign_university_head",
    "super_admin_privileges",
    "remove_user",
  ];
  for (const permission of permissions) {
    const query =
      "INSERT INTO permissions (permission_name) VALUES ($1) ON CONFLICT (permission_name) DO NOTHING";
    await p.query(query, [permission]);
  }
};
const assignPermissionsToRoles = async (p) => {
  const rolePermissions = {
    Society_Head: ["create_event", "remove_event", "update_event"],
    University_Head: [
      "assign_society_head",
      "create_society",
      "update_society",
      "remove_society",
      "create_event",
      "remove_event",
      "update_event",
    ],
    Super_Admin: [
      "super_admin_privileges",
      "assign_society_head",
      "create_society",
      "update_society",
      "remove_society",
      "assign_university_head",
      "create_event",
      "remove_event",
      "update_event",
      "create_university",
      "update_university",
      "remove_university",
      "remove_user",
    ],
  };

  for (const [role, permissions] of Object.entries(rolePermissions)) {
    const roleQuery = "SELECT role_id FROM roles WHERE role_name = $1";
    const roleResult = await p.query(roleQuery, [role]);
    const roleId = roleResult.rows[0].role_id;

    for (const permission of permissions) {
      const permissionQuery =
        "SELECT permission_id FROM permissions WHERE permission_name = $1";
      const permissionResult = await p.query(permissionQuery, [permission]);
      const permissionId = permissionResult.rows[0].permission_id;

      const assignQuery =
        "INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2) ON CONFLICT DO NOTHING";
      await p.query(assignQuery, [roleId, permissionId]);
    }
  }
};

const createUserLogTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS logs (
        log_id SERIAL PRIMARY KEY,
        action VARCHAR(50) NOT NULL, -- e.g., 'INSERT', 'UPDATE', 'DELETE'
        table_name VARCHAR(50) NOT NULL, -- e.g., 'users', 'university'
        changed_by INTEGER NOT NULL, -- ID of the user performing the action
        change_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        details JSONB -- Optional: Additional details about the change
    );
  `;
  return createTableQuery;
};

const createLogTriggers = async (p) => {

  //user Trigger
  const userTrigger = `
      CREATE OR REPLACE FUNCTION log_user_changes()
        RETURNS TRIGGER AS $$
        BEGIN
            
            DECLARE
                current_user_id INTEGER;
            BEGIN
                SELECT variable_value INTO current_user_id 
                FROM global_variables 
                WHERE variable_name = 'current_user_id';
            
                INSERT INTO logs (action, table_name, changed_by, details)
                VALUES (
                    TG_OP, 
                    TG_TABLE_NAME, 
                    current_user_id, 
                    row_to_json(OLD) 
                );
                RETURN NEW; 
            END;
        END;
        $$ LANGUAGE plpgsql;

  `

  const userTrigger2 = `
  CREATE or REPLACE TRIGGER trigger_log_users
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW
    EXECUTE FUNCTION log_user_changes();
  `

  //University Trigger

  const UniTrigger = `
  CREATE OR REPLACE FUNCTION log_university_changes()
    RETURNS TRIGGER AS $$
    BEGIN
        DECLARE
            current_user_id INTEGER;
        BEGIN
            SELECT variable_value INTO current_user_id 
            FROM global_variables 
            WHERE variable_name = 'current_user_id';

            -- For INSERT operation, use only university_id
            IF (TG_OP = 'INSERT') THEN
                INSERT INTO logs (action, table_name, changed_by, details)
                VALUES (
                    TG_OP, 
                    'university', 
                    current_user_id, 
                    (NEW.university_id::TEXT)::JSON -- Ensures only university_id is included
                );
            ELSE
                -- For UPDATE and DELETE operations, include row_to_json(OLD) for details
                INSERT INTO logs (action, table_name, changed_by, details)
                VALUES (
                    TG_OP, 
                    'university', 
                    current_user_id, 
                    row_to_json(OLD) 
                );
            END IF;

            RETURN NEW; 
        END;
    END;
    $$ LANGUAGE plpgsql;


  `
  const UniTrigger2 = `
    CREATE OR REPLACE TRIGGER trigger_log_university
    AFTER INSERT OR UPDATE OR DELETE ON university
    FOR EACH ROW
    EXECUTE FUNCTION log_university_changes();
  `

  const SocTrigger = `
  CREATE OR REPLACE FUNCTION log_society_changes()
    RETURNS TRIGGER AS $$
    BEGIN
        DECLARE
            current_user_id INTEGER;
        BEGIN
            SELECT variable_value INTO current_user_id 
            FROM global_variables 
            WHERE variable_name = 'current_user_id';

            -- For INSERT operation, use only university_id
            IF (TG_OP = 'INSERT') THEN
                INSERT INTO logs (action, table_name, changed_by, details)
                VALUES (
                    TG_OP, 
                    'society', 
                    current_user_id, 
                    (NEW.society_id::TEXT)::JSON -- Ensures only university_id is included
                );
            ELSE
                -- For UPDATE and DELETE operations, include row_to_json(OLD) for details
                INSERT INTO logs (action, table_name, changed_by, details)
                VALUES (
                    TG_OP, 
                    'society', 
                    current_user_id, 
                    row_to_json(OLD) 
                );
            END IF;

            RETURN NEW; 
        END;
    END;
    $$ LANGUAGE plpgsql;


  `
  const SocTrigger2 = `
    CREATE OR REPLACE TRIGGER trigger_log_society
    AFTER INSERT OR UPDATE OR DELETE ON society
    FOR EACH ROW
    EXECUTE FUNCTION log_society_changes();
  `


  p.query(userTrigger)
  p.query(userTrigger2)
  p.query(UniTrigger)
  p.query(UniTrigger2)
  p.query(SocTrigger)
  p.query(SocTrigger2)
}

const createTables = async (p) => {
  try {
    const rolesTableQuery = await createRolesTable();
    const permissionsTableQuery = await createPermissionsTable();
    const rolePermissionsTableQuery = await createRolePermissionsTable();
    const userTableQuery = await createUsersTable();
    const universityTableQuery = await createUniversityTable();
    const societyTableQuery = await createSocietyTable();
    const eventTableQuery = await createEventTable();
    const studentTableQuery = await createStudentTable();
    const RegistrationTableQuery = await createRegistrationTable();
    const ContestTableQuery = await createContestTable();
    const UserLogTable = await createUserLogTable();
    // const alterUsersTableQuery = await alterUsersTable();
    // const alterEventsTableQuery = await alterEventTable();
    // const alterSocietyTableQuery = await alterSocietyTable();
    // const alterUniversityTableQuery = await alterUniversityTable();

    await p.query(rolesTableQuery);
    await insertDefaultRoles(p);
    await p.query(permissionsTableQuery);
    await insertDefaultPermissions(p);
    await p.query(rolePermissionsTableQuery);
    await assignPermissionsToRoles(p);
    await p.query(userTableQuery);
    await p.query(universityTableQuery);
    await p.query(studentTableQuery);
    await p.query(societyTableQuery);
    await p.query(eventTableQuery);
    await p.query(ContestTableQuery);
    await p.query(RegistrationTableQuery);
    await p.query(UserLogTable);
    

    //await p.query(alterEventsTableQuery);
    //await p.query("ALTER TABLE society ALTER COLUMN image_url TYPE VARCHAR(255);");
    console.log("tables created ");
    
    // only uncomment when students doesn't have role_id attribute
    // await p.query(alterUsersTableQuery);
    createLogTriggers(p);
    console.log("triggers created ");

    /* initially, there was no fk_society and fk_university constraint, if you are creating tables from scratch, then comment below two queries
    if constraint already added, i-e already executed the lines below, then comment them, as they'll throw an error */

    // await p.query(alterUniversityTableQuery);
    // await p.query(alterSocietyTableQuery);
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

export default createTables;
