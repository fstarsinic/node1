const sqlite3 = require('sqlite3').verbose();

// Open the SQLite database
const db = new sqlite3.Database('mydatabase.db');

// Function to fetch data from the database based on the query parameter
function get_top_ppg(num, callback) {
  console.log('db.get_top_ppg()')
  const query = `SELECT Player, Points FROM bcb_stats order by Points desc limit ${num}`;
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
    const query = `SELECT Player, Turnovers FROM bcb_stats order by Turnovers desc limit ${num}`;
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
    const query = `SELECT Player, Rebounds FROM bcb_stats order by Rebounds desc limit ${num}`;
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
  const query = `SELECT Player, Rebounds, Points, Turnovers FROM bcb_stats order by Rebounds desc limit ${num}`;
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
  const query = `SELECT Player, Rebounds, Points, Turnovers FROM bcb_stats order by Player`;
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
  const query = `SELECT ID,Player,Points,Rebounds,Assists,Steals,Blocks,Turnovers,FieldGoalPct,ThreePointPercent,FTPercent,TrueShootingPct
  FROM bcb_stats order by Player`;
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

module.exports = {
    get_top_ppg, get_top_turnovers, get_top_rebounds, get_top_multi, get_multi, get_player_data,
};
