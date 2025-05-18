const User = require("../DB/models/User.model.js");
const ApiError = require("../helper/ApiError.js");
const jwt = require("jsonwebtoken");
const protect = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    // Verification for jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;

    next();
  } catch (error) {
    return next(new ApiError(400, error));
  }
};

module.exports = { protect };
