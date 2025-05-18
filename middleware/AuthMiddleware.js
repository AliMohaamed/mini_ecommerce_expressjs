const User = require("../DB/models/UserModel.js");
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
    const decoded = jwt.verify(token, process.env.Access_Token_SECRET);
    const user = await User.findById(decoded.userId).populate("roles");
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(400, error));
  }
};

const authorizeRole =
  (...allowedRoles) =>
  (req, res, next) => {
    const userRoles = req.user.roles.map((r) => r.name);
    const hasAccess = allowedRoles.some((role) => userRoles.includes(role));
    if (!hasAccess)
      return res.status(403).json({ success: false, message: "Access denied" });
    next();
  };

module.exports = { protect, authorizeRole };
