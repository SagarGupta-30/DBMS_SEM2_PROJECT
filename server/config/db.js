const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.APP_DB_HOST || 'localhost',
  user: process.env.APP_DB_USER || 'admin',
  password: process.env.APP_DB_PASSWORD || 'adminpassword',
  database: process.env.APP_DB_NAME || 'testdb',
  port: process.env.APP_DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  idleTimeout: 30000
});

// Test connection on startup
pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL connected successfully');
    conn.release();
  })
  .catch(err => {
    console.error('❌ MySQL connection failed:', err.message);
  });

module.exports = pool;
