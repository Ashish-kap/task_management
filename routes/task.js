const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  createTask,
  listTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");
const { validateTask } = require("../utils/validators");

router.use(authenticate);

router.post("/", validateTask, createTask);
router.get("/",listTasks);
router.get("/:id", getTask);
router.put("/:id", validateTask, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
