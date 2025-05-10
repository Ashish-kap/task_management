const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { logger } = require("../utils/logger");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      id: user.id,
      username: user.username,
      token,
    });
  } catch (error) {
    logger.error(
      `Registration error: ${
        error.errors?.map((e) => e.message) || error.message
      }`
    );
    res.status(400).json({
      message: "Registration failed",
      error: error.errors?.map((e) => e.message) || error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      id: user.id,
      username: user.username,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    logger.error(`login error: ${error.message}`);
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

module.exports = { register, login };
