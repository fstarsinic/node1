const sqlite3 = require('sqlite3').verbose();
const errs = require('../modules/errors/customErrors');

// Define all exports at the end of the module
const exportsObj = {};

// Open the SQLite database
// Determine the directory where the module/script is located
const path = require('path');
const moduleFilePath = __filename;
const moduleDirectory = path.dirname(moduleFilePath);
const dbPath = path.join(moduleDirectory, '../data/mydatabase.db');
console.log(`dbPath: ${dbPath}`);
const db = new sqlite3.Database(dbPath);

async function get_all_teams() {
  console.log('db.get_all_teams()')

  return new Promise((resolve, reject) => {
    const query = `select game_id, team, sum(points) as Points from game_data group by game_id, team order by game_id, Points desc`;
    console.log(query)
    db.all(query, (err, rows) => {
      //console.log(rows)
      if (err) {
        reject(err); // Reject the Promise with an error
      }
      else {
        resolve(rows); // Resolve the Promise with the result
      }
    });
  });
}
module.exports.get_all_teams = get_all_teams;


// Function to fetch data from the database based on the query parameter
async function get_teams() {
  console.log('db.get_teams()')
  return new Promise((resolve, reject) => {
    const query = `SELECT team_id, team_name from team`;
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
});
}
module.exports.get_teams = get_teams;


async function get_team_by_name(teamName) {
  return new Promise((resolve, reject) => {
    // Check if teamName is alphanumeric
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(teamName)) {
      reject(new Error('Invalid teamName. Only alphanumeric characters are allowed.'));
      return; // Return to avoid executing the database query
    }

    const query = 'SELECT team_id, team_name FROM team WHERE team_name = ?';

    db.all(query, [teamName], (err, rows) => {
      if (err) {
        console.error('Error in get_team_by_name:', err);
        reject(err); // Reject with the database error
      } else {
        resolve(rows); // Resolve with the query result
      }
    });
  });
};
module.exports.get_team_by_name = get_team_by_name;


async function get_team_by_id(teamid) {
  console.log(`db.get_team_by_id(${teamid})})`)

  return new Promise((resolve, reject) => {
    if (isNaN(parseInt(teamid))) {
      reject(new errs.DataValidationError('Invalid teamId'));
    }
    //const query = `SELECT team_id, team_name from team where team_id = ${teamid}`;
    const query = `SELECT team_id, team_name, logo from team where team_id = ?`;
    console.log(query)
    db.all(query, [teamid], (err, rows) => {
      console.log(rows)
      if (err) {
        reject(new errs.DatabaseError(err.message)); // Reject the Promise with an error
      } else {
        resolve(rows); // Resolve the Promise with the result
      }
    });
  }
  );
};
module.exports.get_team_by_id = get_team_by_id;


async function get_team_game_results(teamid) {
  console.log('db.get_team_game_results()')
  return new Promise((resolve, reject) => {
    if (isNaN(parseInt(teamid))) {
      reject(new Error('Invalid teamId'));
    }
    const query = `
    select points, ORebounds , DRebounds , 
    (ORebounds + DRebounds) as Rebounds, Player, Game 
    from game_data where 
    team_id = ?
    order by Game, Player;`;
    console.log(query)
    db.all(query, [teamid], (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise with an error
      } else {
        resolve(rows); // Resolve the Promise with the result
      }
    });
  }
  );
};
module.exports.get_team_game_results = get_team_game_results;

 // Function to fetch data from the database based on the query parameter

async function get_team_game_data(teamid) {
  console.log('db.get_team_game_data()')
  return new Promise((resolve, reject) => {
    if (isNaN(parseInt(teamid))) {
      reject(new Error('Invalid teamId'));
    }
    const query = `select Team, Player, Game, Opponent, Points, player_id,team_id from game_data where team_id = ${teamid} order by player, game;`;
    console.log(query)
    db.all(query, (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise with an error
      } else {
        resolve(rows); // Resolve the Promise with the result
      }
    });
  }
  );
}
module.exports.get_team_game_data = get_team_game_data;
