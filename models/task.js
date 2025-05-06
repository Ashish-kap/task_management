const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM("pending", "in-progress", "done"),
    defaultValue: "pending",
  },
});

module.exports = Task;
