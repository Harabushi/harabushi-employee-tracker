require('dotenv').config();
const mysql = require('mysql2');

//Database configuration
const dbConfig = {
	host: 'localhost',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
};

// Connect to database
const db = mysql.createConnection(dbConfig).promise();

module.exports = db;