import pool from "../db/db.js";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";

const getAllUsers = async (req, res, next) => {
  try {
    const queryString = `SELECT * FROM users`;
    const [result] = await pool.query(queryString);

    if (result.length === 0) {
      return next(new apiError(404, "No users found"));
    }

    apiResponse(res, {
      statusCode: 200,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (err) {
    console.error("GetAllUsers Error:", err);
    next(new apiError(500, "Server error: Unable to fetch users"));
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const queryString = `INSERT INTO users (name, email) VALUES (?, ?)`;
    const [result] = await pool.query(queryString, [name, email]);

    const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [
      result.insertId,
    ]);

    apiResponse(res, {
      statusCode: 201,
      message: "User created successfully",
      data: user[0],
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return next(new apiError(400, "Email already exists"));
    }

    console.error("CreateUser Error:", err);
    next(new apiError(500, "Server error: Unable to create user"));
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const queryString = `SELECT * FROM users WHERE id = ?`;
    const [result] = await pool.query(queryString, [id]);

    if (result.length === 0) {
      return next(new apiError(404, "User not found"));
    }

    apiResponse(res, {
      statusCode: 200,
      message: "User fetched successfully",
      data: result[0],
    });
  } catch (err) {
    console.error("GetUser Error:", err);
    next(new apiError(500, "Server error: Unable to fetch user"));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const queryString = `UPDATE users SET name = ? WHERE id = ?`;
    const [result] = await pool.query(queryString, [name, id]);

    if (result.affectedRows === 0) {
      return next(new apiError(404, "User not found"));
    }

    const [updatedUser] = await pool.query(`SELECT * FROM users WHERE id = ?`, [
      id,
    ]);

    apiResponse(res, {
      statusCode: 200,
      message: "User updated successfully",
      data: updatedUser[0],
    });
  } catch (err) {
    console.error("UpdateUser Error:", err);
    next(new apiError(500, "Server error: Unable to update user"));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const queryString = `DELETE FROM users WHERE id = ?`;
    const [result] = await pool.query(queryString, [id]);

    if (result.affectedRows === 0) {
      return next(new apiError(404, "User not found"));
    }

    apiResponse(res, {
      statusCode: 200,
      message: "User deleted successfully",
      data: { deletedId: id },
    });
  } catch (err) {
    console.error("DeleteUser Error:", err);
    next(new apiError(500, "Server error: Unable to delete user"));
  }
};

export { getAllUsers, createUser, getUser, updateUser, deleteUser };
