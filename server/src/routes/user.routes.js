import express from "express";
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";

const router = express.Router();

// GET /api/users
router.get("/", getAllUsers);

// POST /api/users
router.post("/", createUser);

// GET /api/users/:id
router.get("/:id", getUser);

// PUT /api/users/:id
router.put("/:id", updateUser);

// DELETE /api/users/:id
router.delete("/:id", deleteUser);

export default router;
