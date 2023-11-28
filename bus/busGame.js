const dbGame = require('../db/dbGame');
const dbTeam = require('../db/dbTeam');

const exportsObj = {};


exportsObj.get_league_standings = function(callback) {
  console.log('/api/game/leagueStandings endpoint')

  const rows = exportsObj.get_games_deep(callback);
    if (rows.length == 0) {
      res.status(404).json({ error: `Results Not Found`});
      return;
    }
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    } 

      // Create an object to store team standings
      const teamStandings = {};

      // Calculate win/loss records for each team
      rows.forEach((game) => {
          game.teams.forEach((teamData) => {
              const teamName = teamData.team;
              if (!teamStandings[teamName]) {
                  teamStandings[teamName] = { wins: 0, losses: 0 };
              }
              if (teamData.result === 'W') {
                  teamStandings[teamName].wins++;
              } else {
                  teamStandings[teamName].losses++;
              }
            });
          });

      // Create an array of team standings objects
      const teamStandingsArray = Object.entries(teamStandings).map(([team, record]) => ({
          team,
          wins: record.wins,
          losses: record.losses,
      }));

      // Sort the array by wins in descending order
      teamStandingsArray.sort((a, b) => b.wins - a.wins);

      // Convert the sorted array to JSON
      const leagueStandingsJSON = JSON.stringify(teamStandingsArray, null, 2);

      console.log(leagueStandingsJSON);

    res.json(leagueStandingsJSON);
    callback(null, rows);
};



exportsObj.get_games_deep = function(callback) {
  console.log(`bus.get_games_deep()`)
  dbGame.get_games_deep((err, rows) => {
    if(err) {
      console.log(`error: ${err}`)
      callback(err, null);
    }else {
      console.log('Success getting bus data');

      // Transform query results into JSON
      const gameResults = {};
      rows.forEach((row) => {
          console.log(row)
          const { game_id, Team, Points } = row;
          console.log(`game_id: ${game_id}, team: ${Team}, points: ${Points}`)
          if (!gameResults[game_id]) {
              gameResults[game_id] = [];
          }
          gameResults[game_id].push({ Team, Points });
      });

      // Convert the results to JSON and determine the winner
      const jsonResult = Object.entries(gameResults).map(([game_id, teams]) => {
          const winner = teams[0]; // The first team has the highest points (winner)
          winner.result = 'W'; // Add "W" (Win) to the winner's result
          return {
              game_id,
              teams: teams.map((Team) => ({
                  team: Team.Team,
                  points: Team.Points,
                  result: Team === winner ? 'W' : 'L', // Determine "W" or "L" for each team
              })),
          };
      });

      console.log(JSON.stringify(jsonResult, null, 2));


      callback(null, jsonResult);
    }
  });
}

// Function to fetch data from the database based on the query parameter
exportsObj.get_games = function(callback) {
    // Function to transform db rows to highcharts series for packed bubble
    console.log(`bus.get_games()`)
      dbGame.get_games((err, rows) => {
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
exportsObj.get_game_by_id = function(num, callback) {
    // Function to transform db rows to highcharts series for packed bubble
    console.log(`bus.get_game_by_id(${num})`)
      dbGame.get_game_by_id(num, (err, rows) => {
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
  
exportsObj.get_games_by_team_name = function(teamName, callback) {
  console.log(`bus.get_games_by_team_name(${teamName})`)
  dbGame.get_games_by_team_name(teamName, (err, rows) => {
    if(err) {
      console.log(`error: ${err}`)
      callback(err, null);
    }else {
      console.log('Success getting bus data');
      callback(null, rows);
    }
  });
};

exportsObj.get_games_by_team_id = function(teamId, callback) {
  console.log(`bus.get_games_by_team_id(${teamId})`)
  dbGame.get_games_by_team_id(teamId, (err, rows) => {
    if(err) {
      console.log(`error: ${err}`)
      callback(err, null);
    }else {
      console.log('Success getting bus data');
      callback(null, rows);
    }
  });
}

exportsObj.get_game_results = function(gameId, callback) {
  console.log(`bus.get_game_results(${gameId})`)
  dbGame.get_game_results(gameId, (err, rows) => {
    if(err) {
      console.log(`error: ${err}`)
      callback(err, null);
    }else {
      console.log('Success getting bus data');
      callback(null, rows);
    }
  });
};


exportsObj.get_game_winner = function(gameId, callback) {
  console.log(`bus.get_game_winner(${gameId})`)
  dbGame.get_game_winner(gameId, (err, rows) => {
    if(err) {
      console.log(`error: ${err}`)
      callback(err, null);
    }else {
      console.log('Success getting bus data');
      callback(null, rows);
    }
  });
}



module.exports = exportsObj;
