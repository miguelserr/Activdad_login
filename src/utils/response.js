// utils/response.js
const successResponse = (
  res,
  data = {},
  message = "Operación exitosa",
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
const errorResponse = (
  res,
  error = {},
  message = "Error en la operación",
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
module.exports = {
  successResponse,
  errorResponse,
};
