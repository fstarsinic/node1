const sqlite3 = require('sqlite3').verbose();

// Define all exports at the end of the module
const exportsObj = {};

// Open the SQLite database
// Determine the directory where the module/script is located
const path = require('path');
const moduleFilePath = __filename;
const moduleDirectory = path.dirname(moduleFilePath);
const dbPath = path.join(moduleDirectory, '../data/mydatabase.db');
console.log(`dbPath: ${dbPath}`);
const db = new sqlite3.Database(dbPath);


async function get_all_players_points_by_game() {
  console.log('db.get_all_players_points_by_game()')

  return new Promise((resolve, reject) => {
    const query = `SELECT
    ag.game_id,
    pl.player,
    COALESCE(
        SUM(gd.points) OVER (
            PARTITION BY pl.player 
            ORDER BY ag.game_id 
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ),
        0
    ) AS points
FROM
    (SELECT DISTINCT game_id FROM game_data) AS ag
    CROSS JOIN (SELECT DISTINCT player FROM game_data) AS pl
    LEFT JOIN game_data gd ON ag.game_id = gd.game_id AND pl.player = gd.player
ORDER BY
    pl.player, 
    ag.game_id
  `;
    console.log(query)
    db.all(query, (err, rows) => {
      console.log(`db.rows`)  
      console.log(rows)
      if (err) {
        console.log('rejecting')
        reject(err); // Reject the Promise with an error
      } else {
        console.log('resolving')
        resolve(rows); // Resolve the Promise with the result
      }
    });
  }

  );
}
module.exports.get_all_players_points_by_game = get_all_players_points_by_game;

async function get_points_by_game() {
  console.log('db.get_points_by_game()')

  return new Promise((resolve, reject) => {
    const query = `select player,player_id, game, game_num, sum(points) as Points from game_data 
    group by Player, player_id, game_num 
    order by game_num, player_id asc`;
    console.log(query)
    db.all(query, (err, rows) => {
      console.log(`db.rows`)  
      console.log(rows)
      if (err) {
        console.log('rejecting')
        reject(err); // Reject the Promise with an error
      } else {
        console.log('resolving')
        resolve(rows); // Resolve the Promise with the result
      }
    });
  }

  );
}
module.exports.get_points_by_game = get_points_by_game;

async function get_points_by_team() {
  console.log('db.get_points_by_team()')

  return new Promise((resolve, reject) => {
    const query = `select sum(points) as points, player, team from game_data group by team, player order by team, points desc, player`;
    console.log(query)
    db.all(query, (err, rows) => {
      console.log(`db.rows`)  
      console.log(rows)
      if (err) {
        console.log('rejecting')
        reject(err); // Reject the Promise with an error
      } else {
        console.log('resolving')
        resolve(rows); // Resolve the Promise with the result
      }
    });
  }

  );
}
module.exports.get_points_by_team = get_points_by_team;

async function get_acc_game_data() { 
  console.log('db.get_acc_game_data()')

  return new Promise((resolve, reject) => {
    const query = `WITH ShotSummary AS (
      SELECT
          game_id,
          SUM(TwoPointAttempted) AS total_two_point_attempts,
          SUM(TwoPointMade) AS total_two_point_made,
          SUM(ThreePointAttempted) AS total_three_point_attempts,
          SUM(ThreePointMade) AS total_three_point_made,
          SUM(FTAttempted) AS total_ft_attempts,
          SUM(FTMade) AS total_ft_made
      FROM
          game_data
      GROUP BY
          game_id
      ORDER BY
          game_id
  )
  SELECT
      game_id,
      SUM(total_two_point_attempts) OVER (ORDER BY game_id) AS accumulated_two_point_attempts,
      SUM(total_two_point_made) OVER (ORDER BY game_id) AS accumulated_two_point_made,
      SUM(total_three_point_attempts) OVER (ORDER BY game_id) AS accumulated_three_point_attempts,
      SUM(total_three_point_made) OVER (ORDER BY game_id) AS accumulated_three_point_made,
      SUM(total_ft_attempts) OVER (ORDER BY game_id) AS accumulated_ft_attempts,
      SUM(total_ft_made) OVER (ORDER BY game_id) AS accumulated_ft_made,
      CASE
          WHEN SUM(total_two_point_attempts) OVER (ORDER BY game_id) = 0 THEN 0
          ELSE ROUND((SUM(total_two_point_made) OVER (ORDER BY game_id) * 100.0) / SUM(total_two_point_attempts) OVER (ORDER BY game_id), 2)
      END AS accumulated_two_point_shooting_percentage,
      CASE
          WHEN SUM(total_three_point_attempts) OVER (ORDER BY game_id) = 0 THEN 0
          ELSE ROUND((SUM(total_three_point_made) OVER (ORDER BY game_id) * 100.0) / SUM(total_three_point_attempts) OVER (ORDER BY game_id), 2)
      END AS accumulated_three_point_shooting_percentage,
      CASE
          WHEN SUM(total_ft_attempts) OVER (ORDER BY game_id) = 0 THEN 0
          ELSE ROUND((SUM(total_ft_made) OVER (ORDER BY game_id) * 100.0) / SUM(total_ft_attempts) OVER (ORDER BY game_id), 2)
      END AS accumulated_ft_shooting_percentage
  FROM
      ShotSummary;  
  `;
    console.log(query)
    db.all(query, (err, rows) => {
      //console.log(rows)
      if (err) {
        reject(err); // Reject the Promise with an error
      }
      else {
        resolve(rows); // Resolve the Promise with the result
      }
    });
  });
}
module.exports.get_acc_game_data = get_acc_game_data;

async function get_points_per_game() {
  console.log('db.get_points_by_game_id()')

  return new Promise((resolve, reject) => {
    const query = `SELECT game_id, sum(points) as points from game_data group by game_id`;
    console.log(query)
    db.all(query, (err, rows) => {
      console.log(`db.rows`)  
      console.log(rows)
      if (err) {
        console.log('rejecting')
        reject(err); // Reject the Promise with an error
      } else {
        console.log('resolving')
        resolve(rows); // Resolve the Promise with the result
      }
    });
  }

  );
}
module.exports.get_points_per_game = get_points_per_game;


async function get_games_deep() {
  console.log('db.get_games_deep()')

  return new Promise((resolve, reject) => {
    const query = `select game_id, team, team_id, sum(points) as Points from game_data group by game_id, team order by game_id, Points desc`;
    console.log(query)
    db.all(query, (err, rows) => {
      //console.log(rows)
      if (err) {
        reject(err); // Reject the Promise with an error
      }
      else {
        resolve(rows); // Resolve the Promise with the result
      }
    });
  });
}
module.exports.get_games_deep = get_games_deep;


async function get_games() {
  console.log('db.get_games()');

  return new Promise((resolve, reject) => {
    const query = `SELECT game_id, team, opponent from game`;
    console.log(query)
    db.all(query, (err, rows) => {
      console.log(rows)
      if (err) {
        reject(err); // Reject the Promise with an error
      } else {
        resolve(rows); // Resolve the Promise with the result
      }
    });
  });
};
module.exports.get_games = get_games;


async function get_game_by_id(gameid) {
  console.log(`db.get_game_by_id(${gameid})})`)

  return new Promise((resolve, reject) => {
    if (isNaN(parseInt(gameid))) {
      reject(new Error('Invalid gameId'));
    }
    const query = `SELECT game_id, team, opponent from game where game_id = ${gameid}`;
    console.log(query)
    db.all(query, (err, rows) => {
      console.log(rows)
      if (err) {
        reject(err); // Reject the Promise with an error
      } else {
        resolve(rows); // Resolve the Promise with the result
      }
    });
  }
  );
};
module.exports.get_game_by_id = get_game_by_id;


async function get_game_by_team_name(teamName) {
  console.log('db.get_game_by_team_name()')

  return new Promise((resolve, reject) => {
    if (!/^[a-z0-9]+$/i.test(teamName)) {
      reject(new Error('Invalid teamName'));
    }
    const query = `SELECT * from game where team = '${teamName}' or opponent = '${teamName}'`;
    console.log(query)
    db.all(query, (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise with an error
      } else {
        resolve(rows); // Resolve the Promise with the result
      }
    });
  }

  );
}
module.exports.get_game_by_team_name = get_game_by_team_name;


async function get_games_by_team_id(teamId) {
  console.log('db.get_games_by_team_id()')

  return new Promise((resolve, reject) => {
    if (isNaN(parseInt(teamId))) {
      reject(new Error('Invalid teamId'));
    }
    const query = `SELECT * from game where team_id = ${teamId} or opponent_id = ${teamId}`;
    console.log(query)
    db.all(query, (err, rows) => {
      if (err) {
        console.log('rejecting')
        reject(err); // Reject the Promise with an error
      } else {
        console.log('resolving')
        resolve(rows); // Resolve the Promise with the result
      }
    });
  }

  );
}
module.exports.get_games_by_team_id = get_games_by_team_id;


async function get_game_results(gameId) {
  console.log('db.get_game_results()')

  return new Promise((resolve, reject) => {
    if (isNaN(parseInt(gameId))) {
      reject(new Error('Invalid gameId'));
    }
    const query = `select sum(points), team from game_data where game_id = ${gameId} group by team`;
    db.all(query, (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise with an error
      } else {
        resolve(rows); // Resolve the Promise with the result
      }
    });
  }

  );
}
module.exports.get_game_results = get_game_results;


async function get_game_winner(gameId) {
  console.log('db.get_game_winner()')

  return new Promise((resolve, reject) => {
    if (isNaN(parseInt(gameId))) {
      reject(new Error('Invalid gameId'));
    }
    const query = `select max(pts), team from (select sum(points) as pts, team from game_data where game_id = ${gameId} group by team);`;
    db.all(query, (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise with an error
      } else {
        resolve(rows); // Resolve the Promise with the result
      }
    });
  }

  );
}
module.exports.get_game_winner = get_game_winner;

