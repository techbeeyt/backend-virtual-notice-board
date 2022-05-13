const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const mysqlConnection = mysql.createConnection({
    host: process.env.DATABASE_HOSTNAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true,
});

module.exports = mysqlConnection;