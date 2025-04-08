import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

let pool;

export async function connect() {
  let cString =
    "mysql://" +
    process.env.MYSQL_USER +
    ":" +
    process.env.MYSQL_PASSWORD +
    "@" +
    process.env.MYSQL_HOST +
    ":" +
    process.env.MYSQL_PORT +
    "/" +
    process.env.MYSQL_DATABASE;

  pool = mysql
    .createPool(cString)
    .promise();
}

export async function getAllProjects() {
  if (!pool) {
    await connect(); // Ensure connection is established
  }
  const [rows] = await pool.query(`SELECT * FROM projects;`);
  return rows;
}

export async function getProjectById(id) {
  if (!pool) {
    await connect(); // Ensure connection is established
  }
  const [rows] = await pool.query(`SELECT * FROM projects WHERE id = ?;`, [id]);
  return rows[0]; // Return single project object
}


