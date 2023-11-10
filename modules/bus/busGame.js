const dbGame = require('../db/dbGame');

const exportsObj = {};


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
