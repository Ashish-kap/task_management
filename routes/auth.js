const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { validateUser } = require("../utils/validators");

router.post("/register", validateUser, register);
router.post("/login", validateUser, login);

module.exports = router;
