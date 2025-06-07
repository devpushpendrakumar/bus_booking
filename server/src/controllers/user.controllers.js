import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import User from "../models/Users.model.js";

const createUser = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new apiError(400, "User with this email already exists"));
    }

    // Create new user
    const newUser = await User.create({ username, email });

    apiResponse(res, {
      statusCode: 201,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    console.error("CreateUser Error:", err);
    next(new apiError(500, "Server error: Unable to create user"));
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    if (users.length === 0) {
      return next(new apiError(404, "No users found"));
    }

    apiResponse(res, {
      statusCode: 200,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    console.error("GetAllUsers Error:", err);
    next(new apiError(500, "Server error: Unable to fetch users"));
  }
};

export { createUser, getAllUsers };
