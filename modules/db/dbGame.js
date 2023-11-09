const sqlite3 = require('sqlite3').verbose();

// Define all exports at the end of the module
const exportsObj = {};

// Open the SQLite database
const db = new sqlite3.Database('mydatabase.db');

// Function to fetch data from the database based on the query parameter
exportsObj.get_games = function(callback) {
  console.log('db.get_games()')
  const query = `SELECT game_id, team, opponent from game`;
  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

// Function to fetch data from the database based on the query parameter
exportsObj.get_game_by_id = function(gameid, callback) {
  console.log('db.get_games()')
  const query = `SELECT game_id, team, opponent from game where game_id = ${gameid}`;
  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}


exportsObj.get_games_by_team_name = function(teamName, callback) {
  console.log('db.get_game_by_team_name()')
  const query = `SELECT * from game where team = '${teamName}' or opponent = '${teamName}'`;
  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(rows)
      callback(null, rows);
    }
  });
}


// Function to fetch data from the database based on the query parameter
exportsObj.get_top_rebounds = function(num, callback) {
    console.log('db.get_top_rebounds()')
    const query = `SELECT Player, avg(Rebounds) FROM game_data  group by Player order by avg(Rebounds) desc limit ${num}`;
    db.all(query, (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }
  
 // Function to fetch data from the database based on the query parameter
 exportsObj.get_top_multi = function(num, callback) {
  console.log('db.get_top_multi()')
  const query = `SELECT Player, sum(Rebounds), sum(Points), sum(Turnovers) FROM game_data  group by Player order by Player limit ${num}`;
  db.all(query, (err, rows) => {
    if (err) {
      console.log(`error: ${err}`)
      callback(err, null);
    } else {
      console.log('Success getting data')
      callback(null, rows);
    }
  });
}

 // Function to fetch data from the database based on the query parameter
 exportsObj.get_multi = function(callback) {
  console.log('db.get_multi()')
  const query = `SELECT Player, sum(Rebounds), sum(Points), sum(Turnovers) FROM game_data  group by Player order by Player`;
  db.all(query, (err, rows) => {
    if (err) {
      console.log(`error: ${err}`)
      callback(err, null);
    } else {
      console.log('Success getting data')
      callback(null, rows);
    }
  });
}

 // Function to fetch data from the database based on the query parameter
 exportsObj.get_player_data = function(callback) {
  console.log('db.get_player_data()')
  const query = `SELECT p.firstname, p.lastname, t.team_name, t.team_id, avg(points), avg(g.ORebounds+g.DRebounds) as Rebounds,avg(g.Assists),avg(g.Steals),avg(g.Blocks),avg(g.Turnovers),
  round(sum(g.TwoPointMade) *100 / sum(g.TwoPointattempted),2) as FieldGoalPct,
  round(sum(g.ThreePointMade) * 100 / sum(g.ThreePointAttempted),2) as ThreePointPercent,
  round(sum(g.FTMade) *100 /sum(g.FTAttempted),2) as FTPercent 
  FROM game_data g, player p, team t where g.player_id = p.id and g.team_id = t.team_id group by Player order by Player`;
  console.log(query)
  db.all(query, (err, rows) => {
    if (err) {
      console.log(`error: ${err}`)
      callback(err, null);
    } else {
      console.log('Success getting data')

      // Transform rows into an array of arrays
      // TODO: this should occur in a matching bus function
      console.log(rows)
      const jdata = rows.map(row => Object.values(row));
      const resp = { data: jdata}
      console.log(resp)
      callback(null, resp);
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


// Function to fetch data from the database based on the query parameter
 exportsObj.get_game_results = function(team1, team2, game, callback) {
  console.log(`db.get_game_results(${team1}, ${team2}, ${game})`)
  const query = `SELECT
  game_id,
  MAX(CASE WHEN team_id = ${team1} THEN team END) AS team1,
  MAX(CASE WHEN team_id = ${team2} THEN team END) AS team2,
  MAX(CASE WHEN team_id = ${team1} THEN sum_points END) AS team1_points,
  MAX(CASE WHEN team_id = ${team2} THEN sum_points END) AS team2_points,
  CASE
    WHEN MAX(CASE WHEN team_id = ${team1} THEN sum_points END) > MAX(CASE WHEN team_id = ${team2} THEN sum_points END) THEN 'W'
    WHEN MAX(CASE WHEN team_id = ${team2} THEN sum_points END) < MAX(CASE WHEN team_id = ${team2} THEN sum_points END) THEN 'L'
    ELSE 'Tie'
  END AS winner
FROM (
  SELECT game_id, SUM(points) AS sum_points, team, team_id
  FROM game_data
  WHERE team_id IN (${team1}, ${team2}) AND game_id = ${game}
  GROUP BY game_id, team, team_id
) AS subquery
GROUP BY game_id`;
  console.log(query)
  db.all(query, (err, rows) => {
    if (err) {
      console.log(`error: ${err}`)
      callback(err, null);
    } else {
      console.log('db.get_game_results_by_team results --->')
      console.log(rows)
      callback(null, rows)
    }
  });
}

// At the bottom of the module, export the entire object
module.exports = exportsObj;
