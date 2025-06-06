import ApiResponse from "../utils/apiResponse.js";

const errorMiddleware = (err, req, res, next) => {
  console.error("🔥 Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return ApiResponse(res, {
    statusCode,
    message,
    error: err.stack, // Optional: remove this in production
  });
};

export default errorMiddleware;
