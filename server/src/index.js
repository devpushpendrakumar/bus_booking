import dotenv from "dotenv";
dotenv.config();
import "./models/Users.model.js";
import app from "./app.js";
import sequelize from "./db/db.js";

const PORT = process.env.PORT || 5000;
const database = process.env.DB_NAME;

async function startServer() {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log(`Connected to MySQL database: ${database}`);

    // Sync the database tables
    await sequelize.sync({ force: false });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MySQL:", error);
    process.exit(1); // Exit process with failure
  }
}

startServer();
