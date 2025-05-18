const errorHandler = (error, req, res, next) => {
  res.status(500).json({ message: `Error , ${error}` });
};

module.exports = { errorHandler };
