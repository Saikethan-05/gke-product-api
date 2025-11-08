// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   ssl: false, 
//   connectionTimeoutMillis: 10000,
// });

// pool.connect()
//   .then(() => console.log('Connected to PostgreSQL Database'))
//   .catch((err) => console.error('Database connection error:', err));

// module.exports = pool;
// const { Client } = require('pg');



const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool to PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,        
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,        
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,    
  ssl: {
    rejectUnauthorized: false,      
  },
  connectionTimeoutMillis: 10000,
});

// Function to initialize the Product table
async function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS "Product" (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price NUMERIC(10,2) NOT NULL,
      quantity INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log(' Product table is ready');
  } catch (err) {
    console.error(' Error creating Product table:', err);
  }
}

// Connect and initialize
pool.connect()
  .then(() => {
    console.log(' Connected to PostgreSQL Database');
    return initializeDatabase();
  })
  .catch((err) => console.error(' Database connection error:', err));

module.exports = pool;
