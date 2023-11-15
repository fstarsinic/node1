const sqlite3 = require('sqlite3').verbose();

// Define all exports at the end of the module
const exportsObj = {};

// Open the SQLite database
const db = new sqlite3.Database('mydatabase.db');

// Function to fetch data from the database based on the query parameter
exportsObj.get_teams = function(callback) {
  console.log('db.get_teams()')
  const query = `SELECT team_id, team_name from team`;
  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

// Function to fetch data from the database based on the query parameter
exportsObj.get_team_by_id = function(teamid, callback) {
  console.log('db.get_teams()')
  const query = `SELECT team_id, team_name from team where team_id = ${teamid}`;
  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

exportsObj.get_team_by_name = function(teamName, callback) {
  console.log(`db.get_team_by_name(${teamName}})`)
  const query = `SELECT team_id, team_name from team where team_name = '${teamName}'`;
  console.log(query)
  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}


 // Function to fetch data from the database based on the query parameter
 exportsObj.get_team_game_data = function(num, callback) {
  console.log('db.get_team_game_data()')
  const query = `select Team, Player, Game, Opponent, Points, player_id,team_id from game_data where team_id = ${num} order by player, game;`;
  console.log(query)
  db.all(query, (err, rows) => {
    if (err) {
      console.log(`error: ${err}`)
      callback(err, null);
    } else {
      callback(null, rows)
    }
  });
}


// At the bottom of the module, export the entire object
module.exports = exportsObj;
