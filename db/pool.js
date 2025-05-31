const { Pool } = require("pg");

module.exports = new Pool({
    host: "localhost",
    user: "akr4m",
    database: "inventory_app",
    password: "shoyo",
    port: "5432"
});