const sqlite3 = require('sqlite3').verbose();

// Define all exports at the end of the module
const exportsObj = {};

// Open the SQLite database
const db = new sqlite3.Database('mydatabase.db');


// Function to fetch data from the database based on the query parameter
exportsObj.get_players = function(callback) {
  console.log('db.get_players()')
  const query = `SELECT * from player`;
  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

// Function to fetch data from the database based on the query parameter
exportsObj.get_player_by_id = function(id, callback) {
  console.log('db.get_player_by_id()')
  const query = `SELECT * from player where id = ${id}`;
  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

exportsObj.get_players_by_team_name = function(teamName, callback) {
  console.log('db.get_players_by_team_name()')
  const query = `select t.team_name, p.* from player p, team t where p.team_id = t.team_id and t.team_name =  '${teamName}'`;
  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

exportsObj.get_players_by_team_id = function(teamId, callback) {
  console.log('db.get_players_by_team_id()')
  const query = `select t.team_name, p.* from player p, team t where p.team_id = t.team_id and t.team_id =  ${teamId}`;
  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
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


// At the bottom of the module, export the entire object
module.exports = exportsObj;

