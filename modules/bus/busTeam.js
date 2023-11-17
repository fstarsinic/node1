const dbTeam = require('../db/dbTeam');
const dbGame = require('../db/dbGame');

const exportsObj = {};


// Function to fetch data from the database based on the query parameter
exportsObj.get_teams = function(callback) {
  // Function to transform db rows to highcharts series for packed bubble
  console.log(`bus.get_teams()`)
    dbTeam.get_teams((err, rows) => {
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

exportsObj.get_team_by_name = function(teamName, callback) {
  console.log(`bus.get_team_by_name(${teamName})`)
  dbTeam.get_team_by_name(teamName, (err, rows) => {
    if(err) {
      console.log(`error: ${err}`)
      callback(err, null);
    }else {
      console.log('Success getting bus data');
      callback(null, rows);
    }
  });
}

  

// Function to fetch data from the database based on the query parameter
exportsObj.get_team_by_id = function(num, callback) {
  // Function to transform db rows to highcharts series for packed bubble
  console.log(`bus.get_team_by_id(${num})`)
    dbTeam.get_team_by_id(num, (err, rows) => {
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


  const util = require('util');
  const dbGameAsync = util.promisify(dbGame.get_games_by_team_id);
  const dbTeamAsync = util.promisify(dbTeam.get_team_by_id);
  const dbGameResultsAsync = util.promisify(dbGame.get_game_results);
  const dbGameWinnerAsync = util.promisify(dbGame.get_game_winner);
  
  exportsObj.xx_get_team_scorecard = async function (teamId) {
    try {
      const rows = await dbGameAsync(teamId);
  
      const scorecard = [];
      const team = await dbTeamAsync(teamId);
      const team_name = team[0].team_name;
  
      for (const row of rows) {
        const results = await dbGameResultsAsync(row.game_id);
        const winner = await dbGameWinnerAsync(row.game_id);
  
        const team1_result = results[0];
        const team2_result = results[1];
  
        let win_loss = 'L';
        if (winner[0].team == team_name) {
          win_loss = 'W';
        }
  
        let game_result;
        if (team_name == team1_result.Team) {
          game_result = [team1_result.Team, team1_result['sum(points)'], team2_result.Team, team2_result['sum(points)'], win_loss];
        } else {
          game_result = [team2_result.Team, team2_result['sum(points)'], team1_result.Team, team1_result['sum(points)'], win_loss];
        }
  
        scorecard.push(game_result);
      }
  
      return scorecard;
    } catch (error) {
      throw error; // You can handle the error as needed in the calling code
    }
  };
  

  exportsObj.get_team_scorecard = function(teamId, callback) {
      console.log(`bus.get_team_scorecard(${teamId})`);
      dbGame.get_games_by_team_id(teamId, (err, rows) => {
        if (err) {
          console.log(`error: ${err}`);
          callback(err, null);
        } else {
          console.log('Success getting bus data');
          const scorecard = [];
          dbTeam.get_team_by_id(teamId, (err, team) => {
            if (err) {
              return callback(err);
            }
            if (typeof team === "undefined" || team === null) {
              return callback(new Error(`Team not found for id: ${teamId}`));
            }            
            console.log(team)
            if (team.length == 0) {
              return callback(new Error(`Team not found for id: ${teamId}`));
            }
            const team_name = team[0].team_name;
            rows.forEach((row) => {
              dbGame.get_game_results(row.game_id, (err, results) => {
                if (err) {
                  return callback(err);
                }
                dbGame.get_game_winner(row.game_id, (err, winner) => {
                  if (err) {
                    return callback(err);
                  }
                  const team1_result = results[0];
                  const team2_result = results[1];
                  let win_loss = 'L';
                  if (winner[0].team == team_name) {
                    win_loss = 'W';
                  }
                  let game_result;
                  if (team_name == team1_result.Team) {
                    game_result = [team1_result.Team, team1_result['sum(points)'], team2_result.Team, team2_result['sum(points)'], win_loss];
                  } else {
                    game_result = [team2_result.Team, team2_result['sum(points)'], team1_result.Team, team1_result['sum(points)'], win_loss];
                  }
                  scorecard.push(game_result);
                  if (scorecard.length === rows.length) {
                    console.log("scorecard")
                    console.log(scorecard)
                    callback(null, scorecard);
                  }
                });
              });
            });
          });
        }
      });
    }

    exportsObj.get_team_game_data = function(num, callback) {
      console.log('bus.get_team_game_data()')
      dbTeam.get_team_game_data(num, (err, rows) => {
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

  module.exports = exportsObj;