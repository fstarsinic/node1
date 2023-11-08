const db = require('./db')

function get_game_results(team1, team2, game, callback) {
  // Function to transform db rows to highcharts series for packed bubble
  console.log(`bus.get_game_results(${team1}, ${team2}, ${game})`)
    db.get_game_results(team1, team2, game, (err, rows) => {
    if (err) {
      console.log(`error: ${err}`)
      callback(err, null);
    } else {
      console.log('Success getting bus data');
      //console.log(rows)  ;

      //this is where we transform the data as needed
      // Transform rows into an array of arrays
      //console.log(rows)


      const jdata = rows.map(row => Object.values(row));
      const resp = { data: jdata}
      //console.log(resp)
      callback(null, resp);
      }
    });
  }

 // Function to fetch data from the database based on the query parameter
 function get_games_by_team(num, callback) {
  // Function to transform db rows to highcharts series for packed bubble
  console.log(`bus.get_games_by_team(${num})`)
    db.get_games_by_team(num, (err, rows) => {
    if (err) {
      console.log(`error: ${err}`)
      callback(err, null);
    } else {
      console.log('Success getting bus data');
      //console.log(rows)  ;

      const jdata = rows.map(row => Object.values(row));
      const resp = { data: jdata}
      //console.log(resp)
      callback(null, resp);
      }
    });
}

 // Function to fetch data from the database based on the query parameter
 function get_teams(callback) {
  // Function to transform db rows to highcharts series for packed bubble
  console.log(`bus.get_teams()`)
    db.get_teams((err, rows) => {
    if (err) {
      console.log(`error: ${err}`)
      callback(err, null);
    } else {
      console.log('Success getting bus data');
      //console.log(rows)  ;

      //const jdata = rows.map(row => Object.values(row));
      //const resp = { data: jdata}
      //console.log(resp)
      callback(null, rows);
      }
    });
}

 // Function to fetch data from the database based on the query parameter
 function get_game_by_id(num, callback) {
  // Function to transform db rows to highcharts series for packed bubble
  console.log(`bus.get_game_by_id(${num})`)
    db.get_game_by_id(num, (err, rows) => {
    if (err) {
      console.log(`error: ${err}`)
      callback(err, null);
    } else {
      console.log('Success getting bus data');
      //console.log(rows)  ;

      //const jdata = rows.map(row => Object.values(row));
      //const resp = { data: jdata}
      //console.log(resp)
      callback(null, rows);
      }
    });
}


 // Function to fetch data from the database based on the query parameter
 function get_games(callback) {
  // Function to transform db rows to highcharts series for packed bubble
  console.log(`bus.get_games()`)
    db.get_games((err, rows) => {
    if (err) {
      console.log(`error: ${err}`)
      callback(err, null);
    } else {
      console.log('Success getting bus data');
      //console.log(rows)  ;

      //const jdata = rows.map(row => Object.values(row));
      //const resp = { data: jdata}
      //console.log(resp)
      callback(null, rows);
      }
    });
}

 // Function to fetch data from the database based on the query parameter
 function get_team_by_id(num, callback) {
  // Function to transform db rows to highcharts series for packed bubble
  console.log(`bus.get_team_by_id(${num})`)
    db.get_team_by_id(num, (err, rows) => {
    if (err) {
      console.log(`error: ${err}`)
      callback(err, null);
    } else {
      console.log('Success getting bus data');
      //console.log(rows)  ;

      //const jdata = rows.map(row => Object.values(row));
      //const resp = { data: jdata}
      //console.log(resp)
      callback(null, rows);
      }
    });
}


 // Function to fetch data from the database based on the query parameter
 function get_players(callback) {
  // Function to transform db rows to highcharts series for packed bubble
  console.log(`bus.get_players()`)
    db.get_players((err, rows) => {
    if (err) {
      console.log(`error: ${err}`)
      callback(err, null);
    } else {
      console.log('Success getting bus data');
      //console.log(rows)  ;

      //const jdata = rows.map(row => Object.values(row));
      //const resp = { data: jdata}
      //console.log(resp)
      callback(null, rows);
      }
    });
}

 // Function to fetch data from the database based on the query parameter
 function get_player_by_id(num, callback) {
  // Function to transform db rows to highcharts series for packed bubble
  console.log(`bus.get_player_by_id(${num})`)
    db.get_player_by_id(num, (err, rows) => {
    if (err) {
      console.log(`error: ${err}`)
      callback(err, null);
    } else {
      console.log('Success getting bus data');
      //console.log(rows)  ;

      //const jdata = rows.map(row => Object.values(row));
      //const resp = { data: jdata}
      //console.log(resp)
      callback(null, rows);
      }
    });
}



function get_team_game_data(num, callback) {}
// Function to transform db rows to highcharts series for packed bubble
function get_team_game_data(num, callback) {
  console.log('bus.get_team_game_data()')
  db.get_team_game_data(num, (err, rows) => {
    if (err) {
      console.log(`error: ${err}`)
      callback(err, null);
    } else {
      console.log('Success getting data');
      //console.log(rows)  ;

      //this is where we transform the data
        const series = [];
        var playerObj = {};
        var dataArr = [];
        var playerName = '';
        var gameObj = {};
        var team_name = ''
        rows.forEach(row => {
            // Process each row here
            if (row.Player != playerName) {
                if (playerName != '') {
                    playerObj.data = dataArr
                    series.push(playerObj);
                } else {
                }
                playerObj = {};
                dataArr = [];
            }
            gameObj = {'name': row.Opponent, 'value': row.Points}
            dataArr.push(gameObj);
            playerName = row.Player;
            playerObj.name = playerName;
            team_name = row.Team;
            }
          );
        playerObj.data = dataArr
        series.push(playerObj)
        res = {'series': series, 'team_name': team_name}
        console.log(res)
        callback(null, res)
      }
    });
  }
  

module.exports = {
    get_team_game_data, get_game_results, get_games_by_team, get_teams, get_team_by_id,
    get_players, get_player_by_id, get_games, get_game_by_id
};
