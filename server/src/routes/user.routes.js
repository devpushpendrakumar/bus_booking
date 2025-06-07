import express from "express";
import { getAllUsers, createUser } from "../controllers/user.controllers.js";

const router = express.Router();

// GET /api/users
router.get("/", getAllUsers);

// POST /api/users
router.post("/", createUser);

export default router;
