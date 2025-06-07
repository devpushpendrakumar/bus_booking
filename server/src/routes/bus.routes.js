import express from "express";
import { getEmptyBuses, createBus } from "../controllers/bus.controllers.js";

const router = express.Router();

// GET /api/buses
router.get("/available/:empty_seats", getEmptyBuses);

// POST /api/buses
router.post("/", createBus);

export default router;
