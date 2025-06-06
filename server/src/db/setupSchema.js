import pool from "./db.js";

const tables = async () => {
  try {
    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE
      );
    `);
    console.log("✅ Users table created successfully");

    // Buses table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS buses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        bus_number VARCHAR(10) NOT NULL UNIQUE,
        total_seats INT NOT NULL,
        available_seats INT NOT NULL
      );
    `);
    console.log("✅ Buses table created successfully");

    // Bookings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        seat_number INT NOT NULL
      );
    `);
    console.log("✅ Bookings table created successfully");

    // Payments table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        amount_paid INT NOT NULL,
        payment_status BOOLEAN DEFAULT FALSE
      );
    `);
    console.log("✅ Payments table created successfully");
  } catch (error) {
    console.error("❌ Error creating tables:", error);
  }
};

export default tables;
