require('dotenv').config();
const mysql = require('mysql2/promise'); 

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

const DATABASE_NAME = process.env.DB_NAME;

const createTablesScript = `
    -- 2.1. Creación de la tabla Users
    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;

    -- 2.2. Creación de la tabla Tasks
    CREATE TABLE IF NOT EXISTS tasks (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userId INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NULL,
        status ENUM('pending','completed') DEFAULT 'pending',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        CONSTRAINT fk_tasks_user
            FOREIGN KEY (userId)
            REFERENCES users(id)
            ON DELETE CASCADE
    ) ENGINE=InnoDB;
`;

async function initializeDatabase() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);

        const [dbCheck] = await connection.execute(
            `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`, 
            [DATABASE_NAME]
        );

        let dbStatusMessage = '';
        if (dbCheck.length === 0) {
            await connection.execute(`CREATE DATABASE \`${DATABASE_NAME}\``);
            dbStatusMessage = `🎉 Base de datos '${DATABASE_NAME}' creada.`;
        } else {
            dbStatusMessage = `ℹ️ La base de datos '${DATABASE_NAME}' ya estaba creada.`;
        }
        
        console.log(dbStatusMessage);
        
        await connection.end();

        const finalConfig = { ...dbConfig, database: DATABASE_NAME, multipleStatements: true };
        const dbConnection = await mysql.createConnection(finalConfig);
        console.log(`🔗 Conexión establecida con la DB '${DATABASE_NAME}'.`);

        await dbConnection.query(createTablesScript);

        console.log('✅ Tablas Users y Tasks verificadas/creadas exitosamente.');
        
        await dbConnection.end(); 

    } catch (error) {
        console.error('❌ Error durante la inicialización de la base de datos:', error.message);
        process.exit(1); 
    }
}

initializeDatabase();