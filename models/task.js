"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "user",
        onDelete: "CASCADE",
      });
    }
  }

  Task.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title cannot be empty",
          },
          len: {
            args: [3, 255],
            msg: "Title must be between 3-255 characters",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          len: {
            args: [0, 2000],
            msg: "Description cannot exceed 2000 characters",
          },
        },
      },
      status: {
        type: DataTypes.ENUM("pending", "in-progress", "done"),
        defaultValue: "pending",
        validate: {
          isIn: {
            args: [["pending", "in-progress", "done"]],
            msg: "Invalid status value",
          },
        },
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Task",
      timestamps: true,
    }
  );

  return Task;
};
