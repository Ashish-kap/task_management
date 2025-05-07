require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    // username: "postgres",
    // password: "FDCmOTzNrhOCmlQgFjksweRLsluBGLre",
    // database: "railway",
    // host: "ballast.proxy.rlwy.net",
    // dialect: "postgres",
    // port: 50676,
  },
  production: {
    username: "postgres",
    password: "FDCmOTzNrhOCmlQgFjksweRLsluBGLre",
    database: "railway",
    host: "postgres.railway.internal",
    dialect: "postgres",
    port: 50676,
  },
};
