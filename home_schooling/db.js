require('dotenv').config();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database:', process.env.DB_DATABASE);
});


function closeConnection() {
    db.end(err => {
        if (err) {
            console.error('Error closing MySQL database connection:', err);
            return;
        }
        console.log('MySQL database connection closed');
    });
}

module.exports = { db, closeConnection };
