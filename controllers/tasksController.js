const { Task } = require("../models");
const { logger } = require("../utils/logger");

const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      UserId: req.user.id,
    });
    res.status(201).json(task);
  } catch (error) {
    logger.error(`Error creating task: ${error.message}`);
    res.status(400).json({ message: "Error creating task", error });
  }
};

const listTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { UserId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(tasks);
  } catch (error) {
    logger.error(`Error fetching tasks: ${error.message}`);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, UserId: req.user.id },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    logger.error(`Error fetching tasks: ${error.message}`);
    res.status(500).json({ message: "Error fetching task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const [updated] = await Task.update(req.body, {
      where: { id: req.params.id, UserId: req.user.id },
    });

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully" });
  } catch (error) {
    logger.error(`Error updating tasks: ${error.message}`);
    res.status(400).json({ message: "Error updating task", error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.destroy({
      where: { id: req.params.id, UserId: req.user.id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting tasks: ${error.message}`);
    res.status(500).json({ message: "Error deleting task" });
  }
};

module.exports = {
  createTask,
  listTasks,
  getTask,
  updateTask,
  deleteTask,
};
