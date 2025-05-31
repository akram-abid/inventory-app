#! /usr/bin/env node
const { Client } = require("pg");

async function createDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL + "?sslmode=require",
  });
  
  try {
    await client.connect();
    
    // Check if database exists
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'inventory_app'"
    );
    
    if (result.rows.length === 0) {
      console.log("Creating database inventory_app...");
      await client.query("CREATE DATABASE inventory_app");
      console.log("Database created successfully");
    } else {
      console.log("Database inventory_app already exists");
    }
    
    await client.end();
  } catch (error) {
    console.error("Error creating database:", error);
    await client.end();
    throw error;
  }
}

// Your existing seeding function
async function seedDatabase() {
  const SQL = `
-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL UNIQUE
);

-- Create movies table
CREATE TABLE IF NOT EXISTS movies (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  release_date DATE,
  describtion TEXT,
  category_id INTEGER REFERENCES categories(id),
  imageurl TEXT
);

-- Create directors table (if you need it)
CREATE TABLE IF NOT EXISTS directors (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  birth_date DATE
);

-- Insert default categories
INSERT INTO categories (name) 
VALUES
  ('Action'),
  ('Comedy'),
  ('Drama'),
  ('Horror'),
  ('Sci-Fi'),
  ('Romance'),
  ('Thriller'),
  ('Documentary')
ON CONFLICT (name) DO NOTHING;

-- Insert movies
INSERT INTO movies (name, release_date, describtion, category_id, imageurl) 
VALUES
  ('Top Gun', '2025-05-13', 'The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman.', 1, 'https://i.discogs.com/-h3Dzg9TChaj-Xy4DqR1mN0h2xWwfHM1mLnHqAAMxAY/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM3MTQ3/NS0xMzg1MTE2NDc3/LTkwMTYuanBlZw.jpeg'),
  ('Interstellar', '2025-05-21', 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.', 5, 'https://i.ebayimg.com/images/g/vr4AAeSw8sRoCn3r/s-l1600.webp');
`;

  console.log("Creating tables and seeding data...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL + "?sslmode=require",
  });
  
  try {
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    await client.end();
    throw error;
  }
}

async function main() {
  try {
    await createDatabase();
    await seedDatabase();
    console.log("Setup complete!");
  } catch (error) {
    console.error("Setup failed:", error);
    process.exit(1);
  }
}

main();

