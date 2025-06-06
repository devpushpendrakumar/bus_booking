const apiResponse = (
  res,
  { statusCode = 200, message = "Success", data = null, error = null } = {}
) => {
  res.status(statusCode).json({
    status: statusCode,
    message,
    data,
  });
};

export default apiResponse;
