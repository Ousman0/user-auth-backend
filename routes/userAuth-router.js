const express = require("express");
const {
  userRegister,
  userLogin,
  getUserDetails,
} = require("../controllers/userAuth-controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

// user routes declatation
router.post("/signup", userRegister);
router.post("/login", userLogin);
router.get("/user", auth, getUserDetails);

module.exports = router;
