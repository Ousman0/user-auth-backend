const jwt = require("jsonwebtoken");
const user = require("../models/user-model");


// auth middleware for autherization and authentication
const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    // token decoading 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await user
      .findOne({ userId: decoded.userId })
      .select({ password: 0 });
    req.user = userData;
    next();
  } catch (error) {
    console.log("token is invalid");
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
