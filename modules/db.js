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
function get_games(callback) {
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
function get_game_by_id(gameid, callback) {
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

// Function to fetch data from the database based on the query parameter
function get_teams(callback) {
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
function get_team_by_id(teamid, callback) {
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

// Function to fetch data from the database based on the query parameter
function get_players(callback) {
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
function get_player_by_id(id, callback) {
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
 function get_team_game_data(num, callback) {
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
 function get_games_by_team(num, callback) {
  console.log('db.get_team_game_data()')
  const query = `select distinct game_id from game_data where team_id = ${num}`;
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
 function get_game_results(team1, team2, game, callback) {
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

module.exports = {get_teams, get_game_results, get_top_ppg, get_games_by_team, 
                  get_top_turnovers, get_top_rebounds, get_top_multi, 
                  get_multi, get_player_data, get_team_game_data, 
                  get_team_by_id,
                  get_players, get_player_by_id,
                  get_games, get_game_by_id

};
