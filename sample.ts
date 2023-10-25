import * as sqlite3 from 'sqlite3';

// Create an SQLite database connection
const db = new sqlite3.Database('mydatabase.db');

// Define the table creation function
function createTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )
  `;

  // Execute the table creation query
  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table "users" created successfully.');
    }
  });
}

// Define the function to insert a record into the "users" table
function insertSampleRecord(username: string, email: string) {
  const insertQuery = `
    INSERT INTO users (username, email)
    VALUES (?, ?)
  `;

  db.run(insertQuery, [username, email], (err) => {
    if (err) {
      console.error('Error inserting record:', err.message);
    } else {
      console.log('Record inserted successfully.');
    }
  });
}

// Define an interface to specify the shape of rows from the "users" table
interface UserRow {
  id: number;
  username: string;
  email: string;
}

// Define the function to select and display all rows from the "users" table
function selectAllRows() {
  const selectQuery = 'SELECT * FROM users';

  db.all(selectQuery, [], (err, rows: UserRow[]) => { // Specify the type as UserRow[]
    if (err) {
      console.error('Error selecting rows:', err.message);
    } else {
      console.log('All rows from the "users" table:');
      rows.forEach((row) => {
        console.log(`ID: ${row.id}, Username: ${row.username}, Email: ${row.email}`);
      });
    }

    // Close the database connection
    db.close((err) => {
      if (err) {
        console.error('Error closing the database:', err.message);
      } else {
        console.log('Database connection closed.');
      }
    });
  });
}

// Call the function to create the table
createTable();

// Call the function to insert a sample record
insertSampleRecord('JohnDoe', 'johndoe@example.com');

// Call the function to select and display all rows
selectAllRows();
