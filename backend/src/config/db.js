const mysql = require('mysql2');
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 10
})

async function checkConnection() {
    let connection;
    try {
        connection = await pool.promise().getConnection();
        console.log('✅ Conexión a MySQL establecida: Base de datos ' + process.env.DB_NAME);

        connection.release();
    } catch (err) {
        console.error('❌ Error al conectar a MySQL:', err.message);
    }
}

module.exports = {
    pool: pool.promise(),
    checkConnection
}