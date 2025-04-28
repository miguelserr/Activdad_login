// middlewares/errorHandler.js
const { errorResponse } = require("../utils/response");

const errorHandler = (err, req, res, next) => {
  console.error("Error capturado:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor.";
  const errorData = err.data || {};

  return errorResponse(res, errorData, message, statusCode);
};

module.exports = errorHandler;
