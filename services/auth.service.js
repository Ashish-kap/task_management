const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { logger } = require("../utils/logger");

const registerUser = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await User.create({
      username: userData.username,
      password: hashedPassword,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error("Username already exists");
    }
    logger.error(`Registration error: ${error.message}`);
    throw new Error("Registration failed");
  }
};

const authenticateUser = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return { user, token };
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    throw error;
  }
};

module.exports = { registerUser, authenticateUser };
