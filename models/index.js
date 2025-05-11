const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const User = require("./user")(sequelize, DataTypes);
const Task = require("./task")(sequelize, DataTypes);

User.associate({ Task });
Task.associate({ User });

module.exports = {
  sequelize,
  User,
  Task,
};
