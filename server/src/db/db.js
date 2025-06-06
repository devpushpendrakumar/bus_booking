import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 10, // You can adjust this based on load
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL pool connection error:", err);
    process.exit(1);
  } else {
    console.log("MySQL pool connected successfully");
    connection.release(); // Important to release the connection back to the pool
  }
});

export default pool;
