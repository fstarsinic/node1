const dbTeam = require('../db/dbTeam');

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
  

module.exports = exportsObj;
