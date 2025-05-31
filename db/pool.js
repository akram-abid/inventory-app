const { Pool } = require("pg");

module.exports = new Pool({
    host: "localhost",
    user: process.env.USER,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
    port: "5432"
});