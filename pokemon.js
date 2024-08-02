// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getAllPokemon() {
  const queryText = "SELECT * FROM pokemon";
  const res = await pool.query(queryText);
  console.log(res);
  return res.rows;
}

export async function getAllPokemonById(id) {
  // Query the database and return the resource with a matching id or null
  const queryText = "SELECT * FROM pokemon WHERE id = $1";

  const res = await pool.query(queryText, [id]);
  return res.rows[0] || null;
}

export async function createPokemon(resource) {
  // Query the database to create an resource and return the newly created resource
  const queryText = "INSERT INTO pokemon (name, type, level) VALUES ($1, $2, $3) RETURNING *;";
  const res = await pool.query(queryText, [resource.name, resource.type, resource.level]);
  return res.rows[0];
}

export async function updatePokemonById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null
  const queryText = "UPDATE pokemon SET name = $1, type = $2, level = $3 WHERE id = $4 RETURNING *;";
  const res = await pool.query(queryText, [updates.name, updates.type, updates.level, id]);
  return res.rows[0] || null;
}

export async function deletePokemonById(id) {
  try {
    const deleteQuery = "DELETE FROM pokemon WHERE id = $1 RETURNING *;";
    const res = await pool.query(deleteQuery, [id]);
    if (res.rowCount === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error deleting pokemon:", error);
    throw error;
  }
}
