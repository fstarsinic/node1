const dbPlayer = require('../db/dbPlayer');

const exportsObj = {};


// Function to fetch data from the database based on the query parameter
exportsObj.get_players = function(callback) {
    // Function to transform db rows to highcharts series for packed bubble
    console.log(`bus.get_players()`)
      dbPlayer.get_players((err, rows) => {
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
exportsObj.get_player_by_id = function(num, callback) {
    // Function to transform db rows to highcharts series for packed bubble
    console.log(`bus.get_player_by_id(${num})`)
      dbPlayer.get_player_by_id(num, (err, rows) => {
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
  
  exportsObj.get_players_by_team_id = function(teamId, callback) {
    console.log(`bus.get_players_by_team_id(${teamId})`)
    dbPlayer.get_players_by_team_id(teamId, (err, rows) => {
      if(err) {
        console.log(`error: ${err}`)
        callback(err, null);
      }else {
        console.log('Success getting bus data');
        callback(null, rows);
      }
    });
  }

  

  exportsObj.get_players_by_team_name = function(teamName, callback) {
    console.log(`bus.get_players_by_team_name(${teamName})`)
    dbPlayer.get_players_by_team_name(teamName, (err, rows) => {
      if(err) {
        console.log(`error: ${err}`)
        callback(err, null);
      }else {
        console.log('Success getting bus data');
        callback(null, rows);
      }
    });
  };

module.exports = exportsObj;
