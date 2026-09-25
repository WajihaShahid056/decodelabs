const mysql = require("mysql2");

const db = mysql.createConnection({
     host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

db.connect(function(error) {

    if (error) {
        console.log("Database connection failed:", error.message);
        return;
    }

    console.log("MySQL database connected successfully.");

});

module.exports = db;