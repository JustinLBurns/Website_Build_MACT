import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

let pool;

export async function connect() {
  if (pool) return; // Avoid reconnecting if already connected

  const useSSL = process.env.MYSQL_SSL === "true";

  pool = mysql
    .createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: Number(process.env.MYSQL_PORT),

      // ✅ SSL Fix: allows self-signed certs (required for DigitalOcean)
      ssl: useSSL
        ? {
            rejectUnauthorized: false
          }
        : null,

      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    })
    .promise();

  console.log("✅ Connected to MySQL database");
}

export async function getAllProjects() {
  if (!pool) await connect();
  const [rows] = await pool.query(`SELECT * FROM projects;`);
  return rows;
}

export async function getProjectById(id) {
  if (!pool) await connect();
  const [rows] = await pool.query(`SELECT * FROM projects WHERE id = ?;`, [id]);
  return rows[0];
}
