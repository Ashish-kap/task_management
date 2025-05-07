const { Sequelize } = require("sequelize");
const config =
  require("./config/config.js")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize({
  ...config,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
