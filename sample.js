"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3 = require("sqlite3");
// Create an SQLite database connection
var db = new sqlite3.Database('mydatabase.db');
// Define the table creation function
function createTable() {
    var createTableQuery = "\n    CREATE TABLE IF NOT EXISTS users (\n      id INTEGER PRIMARY KEY,\n      username TEXT NOT NULL,\n      email TEXT UNIQUE NOT NULL\n    )\n  ";
    // Execute the table creation query
    db.run(createTableQuery, function (err) {
        if (err) {
            console.error('Error creating table:', err.message);
        }
        else {
            console.log('Table "users" created successfully.');
        }
    });
}
// Define the function to insert a record into the "users" table
function insertSampleRecord(username, email) {
    var insertQuery = "\n    INSERT INTO users (username, email)\n    VALUES (?, ?)\n  ";
    db.run(insertQuery, [username, email], function (err) {
        if (err) {
            console.error('Error inserting record:', err.message);
        }
        else {
            console.log('Record inserted successfully.');
        }
    });
}
// Define the function to select and display all rows from the "users" table
function selectAllRows() {
    var selectQuery = 'SELECT * FROM users';
    db.all(selectQuery, [], function (err, rows) {
        if (err) {
            console.error('Error selecting rows:', err.message);
        }
        else {
            console.log('All rows from the "users" table:');
            rows.forEach(function (row) {
                console.log("ID: ".concat(row.id, ", Username: ").concat(row.username, ", Email: ").concat(row.email));
            });
        }
        // Close the database connection
        db.close(function (err) {
            if (err) {
                console.error('Error closing the database:', err.message);
            }
            else {
                console.log('Database connection closed.');
            }
        });
    });
}
// Call the function to create the table
createTable();
// Call the function to insert a sample record
insertSampleRecord('DylanDoe', 'dylandoe@example.com');
// Call the function to select and display all rows
selectAllRows();
