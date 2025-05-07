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

router.use(authenticate);

router.post("/", createTask);
router.get("/", listTasks);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
