
// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getTrainers() {
  // Query the database and return all resource twos
  const queryText = `SELECT 
    trainers.id AS trainer_id,
    trainers.name AS trainer_name,
    trainers.hometown AS trainer_hometown,
    p1.name AS slot_1,
    p2.name AS slot_2,
    p3.name AS slot_3,
    p4.name AS slot_4,
    p5.name AS slot_5,
    p6.name AS slot_6
FROM 
    trainers
LEFT JOIN pokemon p1 ON trainers.slot_1 = p1.id
LEFT JOIN pokemon p2 ON trainers.slot_2 = p2.id
LEFT JOIN pokemon p3 ON trainers.slot_3 = p3.id
LEFT JOIN pokemon p4 ON trainers.slot_4 = p4.id
LEFT JOIN pokemon p5 ON trainers.slot_5 = p5.id
LEFT JOIN pokemon p6 ON trainers.slot_6 = p6.id;`;
  const res = await pool.query(queryText)
  // console.log(res)
  return res.rows;
}

export async function getTrainerById(id) {
  // Query the database and return the resource with a matching id or null
  const queryText = `
  SELECT 
    trainers.id AS trainer_id,
    trainers.name AS trainer_name,
    trainers.hometown AS trainer_hometown,
    p1.name AS slot_1,
    p2.name AS slot_2,
    p3.name AS slot_3,
    p4.name AS slot_4,
    p5.name AS slot_5,
    p6.name AS slot_6
FROM 
    trainers
LEFT JOIN pokemon p1 ON trainers.slot_1 = p1.id
LEFT JOIN pokemon p2 ON trainers.slot_2 = p2.id
LEFT JOIN pokemon p3 ON trainers.slot_3 = p3.id
LEFT JOIN pokemon p4 ON trainers.slot_4 = p4.id
LEFT JOIN pokemon p5 ON trainers.slot_5 = p5.id
LEFT JOIN pokemon p6 ON trainers.slot_6 = p6.id
WHERE trainers.id = $1;`;
  const res = await pool.query(queryText, [id]);
  //console.log(res)
  return res.rows[0] || null;
}

export async function createTrainerById(resource) {
  const queryText = `INSERT INTO trainers (name, hometown, slot_1, slot_2, slot_3, slot_4, slot_5, slot_6) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;
  const res = await pool.query(queryText, [resource.name, resource.hometown, resource.slot_1, resource.slot_2, resource.slot_3, resource.slot_4, resource.slot_5, resource.slot_6]);

  return res.rows[0] || null;
}

export async function updateTrainerById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null
}

export async function deleteTrainerById(id) {
  try {
    const deleteQuery = "DELETE FROM trainer WHERE id = $1 RETURNING *;";
    const res = await pool.query(deleteQuery, [id]);
    if (res.rowCount === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error deleting Trainer:");
    throw error;
  }
}