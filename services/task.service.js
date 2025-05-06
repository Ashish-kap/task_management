const { Task } = require("../models");
const { logger } = require("../utils/logger");

const createTask = async (taskData) => {
  try {
    return await Task.create(taskData);
  } catch (error) {
    logger.error(`Error creating task: ${error.message}`);
    throw new Error("Failed to create task");
  }
};

const getUserTasks = async (userId) => {
  try {
    return await Task.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
  } catch (error) {
    logger.error(`Error fetching tasks: ${error.message}`);
    throw new Error("Failed to fetch tasks");
  }
};


module.exports = {
  createTask,
  getUserTasks,
F};
