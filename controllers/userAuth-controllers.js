const bcrypt = require("bcryptjs");
const user = require("../models/user-model");
const jwt = require("jsonwebtoken");

// function to generate jwt tokens
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1hour" });
};

// registration controller
const userRegister = async (req, res) => {
  console.log("userRegister got hitted");
  try {
    const { username, email, password } = req.body;
if(!email){

    return res.status(400).json({ message: "invalid crediantials" });
}
    // checking for existing user
    const userExists = await user.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "user already exists" });
    }

    // password hasing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userId = Math.floor(100000 + Math.random() * 90000);

    const newUser = await user.create({
      userName:username,
      email,
      userId,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "user created sucessfully",
      Token: generateToken(newUser.userId),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// login contrller
const userLogin = async (req, res) => {
  console.log("userLogin got hitted");
  try {
    const { email, password } = req.body;

    // Finding user by email
    const userExists = await user.findOne({ email });

    if (!userExists) {
      return res.status(404).json({ message: "user not found" });
    }

    // Compare password
    if (!(await bcrypt.compare(password, userExists.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // sending token i nresponse
    res.json({
      message: "user Login Sucessful",
      Token: generateToken(userExists.userId),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// get user details controller
const getUserDetails = async (req, res) => {
  console.log("getUserDetails got hitted");
  try {
    // sending the user details found from the auth middleware
    res.json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  getUserDetails,
};
