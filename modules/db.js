const sqlite3 = require('sqlite3').verbose();

// Open the SQLite database
const db = new sqlite3.Database('mydatabase.db');

// Function to fetch data from the database based on the query parameter
function get_top_ppg(num, callback) {
  console.log('db.get_top_ppg()')
  const query = `SELECT Player, avg(Points) FROM game_data group by Player order by avg(Points) desc limit ${num}`;
  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

// Function to fetch data from the database based on the query parameter
function get_top_turnovers(num, callback) {
    console.log('db.get_top_turnovers()')
    const query = `SELECT Player, avg(Turnovers) FROM game_data  group by Player order by avg(Turnovers) desc limit ${num}`;
    db.all(query, (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

 // Function to fetch data from the database based on the query parameter
function get_top_rebounds(num, callback) {
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
 function get_top_multi(num, callback) {
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
 function get_multi(callback) {
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
 function get_player_data(callback) {
  console.log('db.get_player_data()')
  const query = `SELECT p.firstname, p.lastname, t.team_name, avg(points), avg(g.ORebounds+g.DRebounds) as Rebounds,avg(g.Assists),avg(g.Steals),avg(g.Blocks),avg(g.Turnovers),
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
      console.log(rows)
      const jdata = rows.map(row => Object.values(row));
      const resp = { data: jdata}
      console.log(resp)
      callback(null, resp);
    }
  });
}

 // Function to fetch data from the database based on the query parameter
 function get_team_game_data(num, callback) {
  console.log('db.get_team_game_data()')
  const query = `select Player, Game, Opponent, Points, player_id,team_id from game_data where team_id = ${num} order by player, game;`;
  console.log(query)
  db.all(query, (err, rows) => {
    if (err) {
      console.log(`error: ${err}`)
      callback(err, null);
    } else {
      console.log('Success getting data')
      console.log(rows)  
      callback(null, rows)
    }
  });
}

module.exports = {
    get_top_ppg, get_top_turnovers, get_top_rebounds, get_top_multi, get_multi, get_player_data, get_team_game_data
};
