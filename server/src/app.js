import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import busRoutes from "./routes/bus.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API is live...");
});

// User routes
app.use("/users", userRoutes);

// Bus routes
app.use("/buses", busRoutes);

// Error handling middleware
app.use(errorMiddleware);

export default app;
