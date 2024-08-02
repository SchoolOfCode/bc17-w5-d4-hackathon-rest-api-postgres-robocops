
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
  // Query the database to create an resource and return the newly created resource
}

export async function updateTrainerById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null
}

export async function deleteTrainerById(id) {
  // Query the database to delete the resource and return the deleted resource or null
}