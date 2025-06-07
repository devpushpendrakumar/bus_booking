import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import Bus from "../models/Bus.model.js";
import { Op } from "sequelize";

const createBus = async (req, res, next) => {
  try {
    const { bus_number, total_seats, empty_seats } = req.body;

    // Check if bus already exists
    const existingBus = await Bus.findOne({ where: { bus_number } });
    if (existingBus) {
      return next(new apiError(400, "Bus with this bus number already exists"));
    }

    // Create new bus
    const newBus = await Bus.create({ bus_number, total_seats, empty_seats });

    apiResponse(res, {
      statusCode: 201,
      message: "Bus created successfully",
      data: newBus,
    });
  } catch (err) {
    console.error("CreateBus Error:", err);
    next(new apiError(500, "Server error: Unable to create bus"));
  }
};

const getEmptyBuses = async (req, res, next) => {
  try {
    const { empty_seats } = req.params;
    const buses = await Bus.findAll({
      where: { empty_seats: { [Op.gt]: `${empty_seats}` } },
    }); //,

    if (buses.length === 0) {
      return next(new apiError(404, "No buses found"));
    }

    apiResponse(res, {
      statusCode: 200,
      message: "buses fetched successfully",
      data: buses,
    });
  } catch (err) {
    console.error("GetAllBuses Error:", err);
    next(new apiError(500, "Server error: Unable to fetch buses"));
  }
};

export { createBus, getEmptyBuses };
