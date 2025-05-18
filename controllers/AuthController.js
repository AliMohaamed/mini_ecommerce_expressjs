const User = require("../DB/models/UserModel.js");
const ApiError = require("../helper/ApiError.js");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new ApiError(400, "User Already Exist"));
    const user = new User({ name, email, password });
    await user.save();

    // JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email,
        iss: process.env.ISSUER,
        aud: process.env.AUDIENCE,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({
      message: "User registered",
      token,
    });
  } catch (error) {
    return next(new ApiError(400, error.message));
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new ApiError(400, "Invalid email or password"));

    console.log(user);
    // password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return next(new ApiError(400, "Invalid email or password"));

    // JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email,
        iss: process.env.ISSUER,
        aud: process.env.AUDIENCE,
      },
      process.env.Access_Token_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({
      message: "Login successfully",
      token,
      expiresIn: Date.now(), // + 1h
    });
  } catch (error) {
    return next(new ApiError(400, error));
  }
};

module.exports = { register, login };
