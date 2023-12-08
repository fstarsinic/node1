const sqlite3 = require('sqlite3').verbose();

// Open the SQLite database
// Determine the directory where the module/script is located
const path = require('path');
const moduleFilePath = __filename;
const moduleDirectory = path.dirname(moduleFilePath);
const dbPath = path.join(moduleDirectory, '../data/mydatabase.db');
console.log(`dbPath: ${dbPath}`);
const db = new sqlite3.Database(dbPath);


async function get_pie()
{
  console.log('db.get_pie()')
  const query = `select player, (sum(points)*100 / (select sum(points) from game_data where team = 'Klassics')) as points from game_data gd where team = 'Klassics' group by player order by sum(points) desc`;
  console.log(query)
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  }
  );
}
module.exports.get_pie = get_pie;

async function get_player_by_name(firstname, lastname) {
  console.log('db.get_player_by_name()')

  //const query = `SELECT * from player where firstname = '${firstname}' and lastname = '${lastname}'`;
  const query = `SELECT * from player where firstname = ? and lastname = ?`;
  console.log(query)
  return new Promise((resolve, reject) => {
      db.all(query, [firstname, lastname], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }
  );
}
module.exports.get_player_by_name = get_player_by_name;

async function add_player(firstName, lastName, active, injured, playerNumber) {
  console.log(`'db.add_player(${firstName}, ${lastName}, ${active}, ${injured}, ${playerNumber})')'`)
  return new Promise((resolve, reject) => {
    params = [firstName, lastName, active, injured, playerNumber]
    console.log(params)
    const sql = `INSERT INTO player (firstname, lastname, active, injured, player_number) VALUES (?, ?, ?, ?, ?)`;  
    console.log(sql)
    db.run(sql, params, function (err) {
        if (err) {
            console.log('detected an error in the db code')
            console.log(err);
            //db.close();
            reject(err);
        } else {
            console.log('db code ran successfully')
            // Get the last inserted row's primary key
            const lastInsertedId = this.lastID;
            console.log(`A row has been inserted with rowid ${lastInsertedId}`);
            //db.close();
            // Resolve the Promise with the primary key
            resolve(lastInsertedId);
        }
    });
});} 
module.exports.add_player = add_player;

// Function to fetch data from the database based on the query parameter
async function get_players() {
  console.log('db.get_players()')
  const query = `SELECT * from player`;
  console.log(query)
  return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }
  );
};
module.exports.get_players = get_players;

// Function to fetch data from the database based on the query parameter
async function get_player_by_id(id) {
  console.log('db.get_player_by_id()')
  const query = `SELECT * from player where id = ${id}`;
  console.log(query)
  return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }
  );
};
module.exports.get_player_by_id = get_player_by_id;

async function get_players_by_team_name(teamName) {
  console.log('db.get_players_by_team_name()')
  const query = `select t.team_name, p.* from player p, team t where p.team_id = t.team_id and t.team_name =  '${teamName}'`;
  console.log(query)
  return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, rows);
        }
      });
    }
  );
};
module.exports.get_players_by_team_name = get_players_by_team_name;


async function get_team_by_id(num, callback) {
  console.log('db.get_players_by_team_id()')
  const query = `select t.team_name, p.* from player p, team t where p.team_id = t.team_id and t.team_id =  ${teamId}`;
  console.log(query)
  return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, rows);
        }
      });
    }
  );
};
module.exports.get_team_by_id = get_team_by_id;



 // Function to fetch data from the database based on the query parameter
async function get_player_stats() {
  console.log('db.get_player_stats()')
  const query = `SELECT p.firstname, p.lastname, t.team_name, t.team_id, avg(points), avg(g.ORebounds+g.DRebounds) as Rebounds,avg(g.Assists),avg(g.Steals),avg(g.Blocks),avg(g.Turnovers),
  round(sum(g.TwoPointMade) *100 / sum(g.TwoPointattempted),2) as FieldGoalPct,
  round(sum(g.ThreePointMade) * 100 / sum(g.ThreePointAttempted),2) as ThreePointPercent,
  round(sum(g.FTMade) *100 /sum(g.FTAttempted),2) as FTPercent 
  FROM game_data g, player p, team t where g.player_id = p.id and g.team_id = t.team_id group by Player order by Player`;
  console.log(query)
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  }
  );
};
module.exports.get_player_stats = get_player_stats;

async function get_player_data(playerId, callback) {
  console.log(`db.get_player_data(${playerId})`)

  const id = parseInt(playerId, 10);

  if (!Number.isInteger(id)) {
    const error = new Error('playerId must be an integer');
    return callback(error, null);
  }
  if (id < 0) {
    const error = new Error('playerId must be greater than 0');
    return callback(error, null);
  }
  const query = `SELECT g.* FROM game_data g, player p, team t where g.player_id = p.id and g.team_id = t.team_id and p.id = ${id}` 
  console.log(query)
  db.all(query, (err, rows) => {
    if (err) {
      console.log(`error: ${err}`)
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}
module.exports.get_player_data = get_player_data;

