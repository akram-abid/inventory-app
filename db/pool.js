const { Pool } = require("pg");

// Retrieve the database connection string from environment variables
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Error: DATABASE_URL environment variable is not set.');
  process.exit(1); // Exit if the connection string is missing
}

// Configure the pool
const poolConfig = {
  connectionString: connectionString,
  // Koyeb managed databases typically require SSL.
  // Setting rejectUnauthorized to false is common for managed services,
  // but review Koyeb's specific recommendations for production.
  ssl: {
    rejectUnauthorized: false
  }
};

// Create a new pool instance
const pool = new Pool(poolConfig);

// Optional: Test the connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Database connection established successfully.');
  client.query('SELECT NOW()', (err, result) => {
    release(); // Release the client back to the pool
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Query executed successfully:', result.rows);
  });
});

module.exports = pool;