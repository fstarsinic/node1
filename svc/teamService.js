const dbGame = require('../db/dbGame');
const dbTeam = require('../db/dbTeam');
const svcGame = require('../svc/gameService');
const errs = require('../modules/errors/customErrors');

async function getAllTeams() {
    try {
        console.log('svc.getAllTeams()')
        teams = await dbTeam.get_all_teams(); // Assuming a database function to fetch games
        console.log(`svc.teams`)
        console.log(teams)
        return teams;
    } catch (error) {
        throw new Error(`Failed to fetch teams: ${error.message}`);
    }   
}
module.exports.getAllTeams = getAllTeams;

async function getTeams() {
    try {
        console.log('svc.getTeams()')
        teams = await dbTeam.get_all_teams(); // Assuming a database function to fetch games
        console.log(`svc.teams`)
        console.log(teams)
        return teams;
    } catch (error) {
        throw new Error(`Failed to fetch teams: ${error.message}`);
    }   
}
module.exports.getTeams = getTeams;

async function getTeamById(teamId) {
    try {
        console.log('getTeamById')
        console.log(`svc.getTeamById(${teamId})`)
        const team = await dbTeam.get_team_by_id(teamId); // Assuming a database function to fetch a game
        console.log(team.length)
        if (team?.length == 0) {
            throw new errs.ResourceNotFoundError('No team with that Id');
        } else {
            return team;
        }
    } catch (error) {
        throw error;
    }
}
module.exports.getTeamById = getTeamById;

async function getTeamByName(teamName) {
    try {
        console.log(`svc.getTeamByName(${teamName})`)
        const team = await dbTeam.get_team_by_name(teamName); // Assuming a database function to fetch a game
        console.log(`svc.team`)
        console.log(team)
        return team;
    } catch (error) {
        throw new Error('Failed to fetch team');
    }
}   
module.exports.getTeamByName = getTeamByName;


async function getTeamGameData(teamId) {
    try {
        console.log(`svc.getTeamGameData(${teamId})`)
        const team = await dbTeam.get_team_game_data(teamId); // Assuming a database function to fetch a game
        console.log(team)
        return team;
    } catch (error) {
        throw new Error('Failed to fetch team');
    }
}
module.exports.getTeamGameData = getTeamGameData;

async function getTeamScorecard(teamId) {
    console.log(`bus.get_team_scorecard(${teamId})`);
    try {
      const games = await svcGame.getGamesByTeamId(teamId);
      if (!games?.length) {
        throw new Error(`Results Not Found for ${teamId}`);
      }
      console.log('Success getting bus data');
      const scorecard = [];
      const team = await dbTeam.get_team_by_id(teamId);
      if (team.length == 0) {
        throw new errs.ResourceNotFoundError(`Results Not Found for ${teamId}`);
      }
      const team_name = team[0].team_name;
      
      for (const game of games) {
        const gameResults = await dbGame.get_game_results(game.game_id);
        const winner = await dbGame.get_game_winner(game.game_id);
        console.log('getting team results');
        const team1_result = gameResults[0];
        const team2_result = gameResults[1];
        console.log(team1_result);
        console.log(team2_result);
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
        console.log('pushing game result');
        scorecard.push(game_result);
      }
      
      console.log("returning scorecard");
      return scorecard;
    } catch (error) {
      throw new Error(`Failed to fetch team: ${error.message}`);
    }
  }  
module.exports.getTeamScorecard = getTeamScorecard;