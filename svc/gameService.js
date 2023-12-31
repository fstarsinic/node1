const dbGame = require('../db/dbGame');
const dbTeam = require('../db/dbTeam');
const errs = require('../modules/errors/customErrors');

const exportsObj = {};

function transformData(data) {
    // Implement your transformation logic here
    // Example: Doubling the values of all numbers
    const gameData = {}
    gamesObj = {}
    current_player = '';
    if (Array.isArray(data)) {
      console.log('data is array')
      data.forEach((row) => {
        const { game_id, player, points} = row;
        if (current_player != player) {
          if (current_player != '') {
            gameData[current_player] = gamesObj;
          }
          current_player = player;
          gamesObj = {};
        }
        current_player = player;
        console.log(`game_id: ${game_id}, player: ${player}, points: ${points}`)
        //console.log(row);
        //gamesObj['game ' + game_id] = points;      
        gamesObj[game_id] = points;      
        //console.log(gamesObj)
      });
    };   
    return gameData;
  };

  
async function getAllPlayersPointsByGame() {
    try {
        console.log('svc.async function getAllPlayersPointsByGame()')
        const points = await dbGame.get_all_players_points_by_game(); // Assuming a database function to fetch games
        console.log(`svc.points`)
        console.log(points)
        //const jpoints = JSON.stringify(points);
        const trans_points = transformData(points);
        console.log('trans_points')
        console.log(trans_points)
        return trans_points;
    } catch (error) {
        throw new Error(`Failed to fetch points: ${error.message}`);
    }
}
module.exports.getAllPlayersPointsByGame = getAllPlayersPointsByGame;


async function getPointsByGame() {
    try {
        console.log('svc.getPointsByGame()')
        const points = await dbGame.get_points_by_game(); // Assuming a database function to fetch games
        console.log(`svc.points`)
        console.log(points)
        return points;
    } catch (error) {
        throw new Error(`Failed to fetch points: ${error.message}`);
    }
}
module.exports.getPointsByGame = getPointsByGame;


async function getPointsByTeam() {
    try {
        console.log('svc.getPointsByTeam()')
        const points = await dbGame.get_points_by_team(); // Assuming a database function to fetch games
        console.log(`svc.points`)
        console.log(points)
        points.forEach((row) => {
            console.log(row)
            const { game_id, Team, Points } = row;
            console.log(`game_id: ${game_id}, team: ${Team}, points: ${Points}`)
        });
        return points;
    } catch (error) {
        throw new Error(`Failed to fetch points: ${error.message}`);
    }
}
module.exports.getPointsByTeam = getPointsByTeam;

async function getAccGameData() {
    try {
        console.log('svc.getAccGameData()')
        const games = await dbGame.get_acc_game_data(); // Assuming a database function to fetch games
        console.log(`svc.games`)
        console.log(games)
        return games;
    } catch (error) {
        throw new Error(`Failed to fetch games: ${error.message}`);
    }
};
module.exports.getAccGameData = getAccGameData;


async function getPointsPerGame() {
    try {
        console.log('svc.getPointsPerGame()')
        const points = await dbGame.get_points_per_game(); // Assuming a database function to fetch games
        console.log(`svc.points`)
        console.log(points)
        return points;
    } catch (error) {
        throw new Error(`Failed to fetch points: ${error.message}`);
    }
};
module.exports.getPointsPerGame = getPointsPerGame;

// Function to get all games from the database
async function getAllGames() {
  try {
    console.log('svc.getAllGames()')
    const games = await dbGame.get_games(); // Assuming a database function to fetch games
    console.log(`svc.games`)
    console.log(games)
    return games;
  } catch (error) {
    throw new Error(`Failed to fetch games: ${error.message}`);
  }
}
module.exports.getAllGames = getAllGames;

async function getGameById(gameId) {
    try {
      console.log(`svc.getGameById(${gameId})`)
      const game = await dbGame.get_game_by_id(gameId); // Assuming a database function to fetch a game
      console.log(`svc.game`)
      console.log(game)
      return game;
    } catch (error) {
      throw new Error('Failed to fetch game');
    }
}
module.exports.getGameById = getGameById;


  
async function getGamesByTeamName(teamName) {
    try {
        console.log(`svc.getGamesByTeamName(${teamName})`)
        const team = await dbGame.get_game_by_team_name(teamName); // Assuming a database function to fetch a game
        return team;
    } catch (error) {
        throw new Error('Failed to fetch team');
    }
}
module.exports.getGamesByTeamName = getGamesByTeamName;
  
async function getGamesByTeamId(teamId) {
    try {
        console.log(`svc.getGamesByTeamId(${teamId})`)
        const team = await dbGame.get_games_by_team_id(teamId); // Assuming a database function to fetch a game
        return team;
    } catch (error) {
        throw new Error('Failed to fetch team');
    }
}
module.exports.getGamesByTeamId = getGamesByTeamId;

async function getGameResults(gameId) {
    try {
        console.log(`svc.getGameResults(${gameId})`)
        const game = await dbGame.get_game_results(gameId); // Assuming a database function to fetch a game
        console.log(game)
        return game;
    } catch (error) {
        throw new Error('Failed to fetch game');
    }
}
module.exports.getGameResults = getGameResults;

async function getGameWinner(gameId) {
    try {
        console.log(`svc.getGameWinner(${gameId})`)
        const game = await dbGame.get_game_winner(gameId); // Assuming a database function to fetch a game
        return game;
    } catch (error) {
        throw new Error('Failed to fetch game');
    }
}
module.exports.getGameWinner = getGameWinner;

async function getGamesDeep() {
    console.log(`svc.getGamesDeep()`)
    try {
        const games = await dbGame.get_games_deep(); // Assuming a database function to fetch games
        console.log(`svc.games`)
        console.log(games)
        // Transform query results into JSON
        const gameResults = {};
        games.forEach((row) => {
            console.log(row)
            const { game_id, Team, team_id, Points } = row;
            //console.log(`game_id: ${game_id}, team: ${Team}, points: ${Points}`)
            if (!gameResults[game_id]) {
                gameResults[game_id] = [];
            }
            gameResults[game_id].push({ Team, team_id, Points });
        });
  
        // Convert the results to JSON and determine the winner
        const jsonResult = Object.entries(gameResults).map(([game_id, teams]) => {
            const winner = teams[0]; // The first team has the highest points (winner)
            winner.result = 'W'; // Add "W" (Win) to the winner's result
            return {
                game_id,
                teams: teams.map((Team) => ({
                    team: Team.Team,
                    teamId: Team.team_id,
                    points: Team.Points,
                    result: Team === winner ? 'W' : 'L', // Determine "W" or "L" for each team
                })),
            };
        });
        console.log('returning from svc.getGamesDeep()')
        return jsonResult
    } catch (error) {
        throw new Error(`Failed to fetch games ${error.message}`);
    }
}
module.exports.getGamesDeep = getGamesDeep;
    
async function getLeagueStandings() {
    try {
        console.log(`svc.getLeagueStandings()`)
        const games = await getGamesDeep(); 
        console.log(`svc.getLeagueStandings()`)
        console.log('Got game!')
        // Create an object to store team standings
        const teamStandings = {};

        // Calculate win/loss records for each team
        console.log('Loopoing thru games')
        games.forEach((game) => {
            console.log('Next game')
            console.log(game)
            game.teams.forEach((teamData) => {
                console.log(teamData)
                console.log('Next team')
                const teamName = teamData.team;
                const teamId = teamData.teamId;
                console.log(teamId)
                if (!teamStandings[teamName]) {
                    teamStandings[teamName] = { teamId: teamId, wins: 0, losses: 0 };
                }
                if (teamData.result === 'W') {
                    console.log(`teamName: ${teamName} wins!`)
                    teamStandings[teamName].wins++;
                } else {
                    console.log(`teamName: ${teamName} loses!`)
                    teamStandings[teamName].losses++;
                }
            });
        });
        console.log('Done looping thru games')
        console.log(teamStandings)
        // Create an array of team standings objects
        const teamStandingsArray = Object.entries(teamStandings).map(([team, record]) => ({
            team,
            teamId: record.teamId,
            wins: record.wins,
            losses: record.losses,
        }));
        console.log(teamStandingsArray)

        // Sort the array by wins in descending order
        teamStandingsArray.sort((a, b) => b.wins - a.wins);

        // Convert the sorted array to JSON
        //const leagueStandingsJSON = JSON.stringify(teamStandingsArray, null, 2);
        console.log('returning from svc.getLeagueStandings()')
        console.log(teamStandingsArray);
        return teamStandingsArray
    } catch (error) {
        throw new Error(`Failed to fetch games: ${error.message}`);
    }
}
module.exports.getLeagueStandings = getLeagueStandings;




