const sqlite3 = require('sqlite3').verbose();

// Define all exports at the end of the module
const exportsObj = {};

// Open the SQLite database
const db = new sqlite3.Database('mydatabase.db');


async function get_games_deep() {
  console.log('db.get_games_deep()')

  return new Promise((resolve, reject) => {
    const query = `select game_id, team, team_id, sum(points) as Points from game_data group by game_id, team order by game_id, Points desc`;
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
module.exports.get_games_deep = get_games_deep;


async function get_games() {
  console.log('db.get_games()');

  return new Promise((resolve, reject) => {
    const query = `SELECT game_id, team, opponent from game`;
    console.log(query)
    db.all(query, (err, rows) => {
      console.log(rows)
      if (err) {
        reject(err); // Reject the Promise with an error
      } else {
        resolve(rows); // Resolve the Promise with the result
      }
    });
  });
};
module.exports.get_games = get_games;


async function get_game_by_id(gameid) {
  console.log(`db.get_game_by_id(${gameid})})`)

  return new Promise((resolve, reject) => {
    if (isNaN(parseInt(gameid))) {
      reject(new Error('Invalid gameId'));
    }
    const query = `SELECT game_id, team, opponent from game where game_id = ${gameid}`;
    console.log(query)
    db.all(query, (err, rows) => {
      console.log(rows)
      if (err) {
        reject(err); // Reject the Promise with an error
      } else {
        resolve(rows); // Resolve the Promise with the result
      }
    });
  }
  );
};
module.exports.get_game_by_id = get_game_by_id;


async function get_game_by_team_name(teamName) {
  console.log('db.get_game_by_team_name()')

  return new Promise((resolve, reject) => {
    if (!/^[a-z0-9]+$/i.test(teamName)) {
      reject(new Error('Invalid teamName'));
    }
    const query = `SELECT * from game where team = '${teamName}' or opponent = '${teamName}'`;
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
module.exports.get_game_by_team_name = get_game_by_team_name;


async function get_games_by_team_id(teamId) {
  console.log('db.get_games_by_team_id()')

  return new Promise((resolve, reject) => {
    if (isNaN(parseInt(teamId))) {
      reject(new Error('Invalid teamId'));
    }
    const query = `SELECT * from game where team_id = ${teamId} or opponent_id = ${teamId}`;
    console.log(query)
    db.all(query, (err, rows) => {
      if (err) {
        console.log('rejecting')
        reject(err); // Reject the Promise with an error
      } else {
        console.log('resolving')
        resolve(rows); // Resolve the Promise with the result
      }
    });
  }

  );
}
module.exports.get_games_by_team_id = get_games_by_team_id;


async function get_game_results(gameId) {
  console.log('db.get_game_results()')

  return new Promise((resolve, reject) => {
    if (isNaN(parseInt(gameId))) {
      reject(new Error('Invalid gameId'));
    }
    const query = `select sum(points), team from game_data where game_id = ${gameId} group by team`;
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
module.exports.get_game_results = get_game_results;


async function get_game_winner(gameId) {
  console.log('db.get_game_winner()')

  return new Promise((resolve, reject) => {
    if (isNaN(parseInt(gameId))) {
      reject(new Error('Invalid gameId'));
    }
    const query = `select max(pts), team from (select sum(points) as pts, team from game_data where game_id = ${gameId} group by team);`;
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
module.exports.get_game_winner = get_game_winner;

