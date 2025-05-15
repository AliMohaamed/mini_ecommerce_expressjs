// Helper function for consistent responses
exports.sendResponse = (res, statusCode, success, message, data = null) => {
  const response = { success };
  if (message) response.message = message;
  if (data) response.data = data;
  return res.status(statusCode).json(response);
};
