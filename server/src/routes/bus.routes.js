import express from "express";
import {
  getAllBuses,
  createBus,
  getBus,
  updateBus,
  deleteBus,
} from "../controllers/bus.controllers.js";

const router = express.Router();

// GET /api/buses
router.get("/", getAllBuses);

// POST /api/buses
router.post("/", createBus);

// GET /api/buses/:id
router.get("/:id", getBus);

// PUT /api/buses/:id
router.put("/:id", updateBus);

// DELETE /api/buses/:id
router.delete("/:id", deleteBus);

export default router;
