import { pool } from "../index.js";



// >>> MAKE SURE YOU UNDERSTAND THIS FILE AND WHAT IT'S DOING <<<
// >>> FEEL FREE TO CHANGE IT TO MAKE YOUR OWN RESOURCES (TABLES AND PROPERTIES) - YOU DON'T HAVE TO USE ALBUMS AND ARTISTS <<<

async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
        DROP TABLE IF EXISTS trainers CASCADE;
        DROP TABLE IF EXISTS pokemon CASCADE;
    `);

    // Create the pokemon table
    await pool.query(`
        CREATE TABLE pokemon (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            type VARCHAR(50) NOT NULL
        );
    `);

    // Create the trainers table with foreign keys to the pokemon table
    await pool.query(`
        CREATE TABLE trainers (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            hometown VARCHAR(255) NOT NULL,
            slot_1 INT REFERENCES pokemon(id),
            slot_2 INT REFERENCES pokemon(id),
            slot_3 INT REFERENCES pokemon(id),
            slot_4 INT REFERENCES pokemon(id),
            slot_5 INT REFERENCES pokemon(id),
            slot_6 INT REFERENCES pokemon(id)
        );
    `);

    // Seed the pokemon table
    await pool.query(`
        INSERT INTO pokemon (name, type)
        VALUES 
            ('Pikachu', 'Electric'),
            ('Charizard', 'Fire/Flying'),
            ('Bulbasaur', 'Grass/Poison'),
            ('Squirtle', 'Water'),
            ('Eevee', 'Normal');
    `);

    // Seed the trainers table
    await pool.query(`
        INSERT INTO trainers (name, hometown, slot_1, slot_2, slot_3, slot_4, slot_5, slot_6)
        VALUES 
            ('Ash Ketchum', 'Pallet Town', 1, 2, NULL, NULL, NULL, NULL),
            ('Misty', 'Cerulean City', 4, NULL, NULL, NULL, NULL, NULL),
            ('Brock', 'Pewter City', 3, 5, NULL, NULL, NULL, NULL);
    `);

    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}


await resetDatabase();
