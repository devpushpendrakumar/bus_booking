import pool from "../db/db.js";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";

const getAllBuses = async (req, res, next) => {
  try {
    const queryString = `SELECT * FROM buses`;
    const [result] = await pool.query(queryString);

    if (result.length === 0) {
      return next(new apiError(404, "No buses found"));
    }

    apiResponse(res, {
      statusCode: 200,
      message: "Buses fetched successfully",
      data: result,
    });
  } catch (err) {
    console.error("GetAllBuses Error:", err);
    next(new apiError(500, "Server error: Unable to fetch buses"));
  }
};

const createBus = async (req, res, next) => {
  try {
    const { bus_number, total_seats, available_seats } = req.body;

    const queryString = `INSERT INTO buses (bus_number, total_seats, available_seats) VALUES (?, ?, ?)`;
    const [result] = await pool.query(queryString, [
      bus_number,
      total_seats,
      available_seats,
    ]);

    const [bus] = await pool.query("SELECT * FROM buses WHERE id = ?", [
      result.insertId,
    ]);

    apiResponse(res, {
      statusCode: 201,
      message: "Bus created successfully",
      data: bus[0],
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return next(new apiError(400, "Bus already exists"));
    }

    console.error("CreateBus Error:", err);
    next(new apiError(500, "Server error: Unable to create bus"));
  }
};

const getBus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const queryString = `SELECT * FROM buses WHERE id = ?`;
    const [result] = await pool.query(queryString, [id]);

    if (result.length === 0) {
      return next(new apiError(404, "Bus not found"));
    }

    apiResponse(res, {
      statusCode: 200,
      message: "Bus fetched successfully",
      data: result[0],
    });
  } catch (err) {
    console.error("GetBus Error:", err);
    next(new apiError(500, "Server error: Unable to fetch bus"));
  }
};

const updateBus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { available_seats, total_seats } = req.body;

    const queryString = `UPDATE buses SET available_seats = ?, total_seats = ? WHERE id = ?`;
    const [result] = await pool.query(queryString, [
      available_seats,
      total_seats,
      id,
    ]);

    if (result.affectedRows === 0) {
      return next(new apiError(404, "Bus not found"));
    }

    const [updatedBus] = await pool.query(`SELECT * FROM buses WHERE id = ?`, [
      id,
    ]);

    apiResponse(res, {
      statusCode: 200,
      message: "Bus updated successfully",
      data: updatedBus[0],
    });
  } catch (err) {
    console.error("UpdateBus Error:", err);
    next(new apiError(500, "Server error: Unable to update bus"));
  }
};

const deleteBus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const queryString = `DELETE FROM buses WHERE id = ?`;
    const [result] = await pool.query(queryString, [id]);

    if (result.affectedRows === 0) {
      return next(new apiError(404, "Bus not found"));
    }

    apiResponse(res, {
      statusCode: 200,
      message: "Bus deleted successfully",
      data: { deletedId: id },
    });
  } catch (err) {
    console.error("DeleteBus Error:", err);
    next(new apiError(500, "Server error: Unable to delete bus"));
  }
};

export { getAllBuses, createBus, getBus, updateBus, deleteBus };
