const dbPlayer = require('../db/dbPlayer');


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


// Function to fetch data from the database based on the query parameter
async function getPlayers() {
    try {
        console.log('svc.getPlayers()')
        players = await dbPlayer.get_players(); // Assuming a database function to fetch games
        console.log(`svc.players`)
        console.log(players)
        return players;
    } catch (error) {
        throw new Error(`Failed to fetch players: ${error.message}`);
    }   
}
module.exports.getPlayers = getPlayers;

async function getPlayerById(playerId) {
    try {
        console.log(`svc.getPlayerById(${playerId})`)
        const player = await dbPlayer.get_player_by_id(playerId); // Assuming a database function to fetch a game
        console.log(`svc.player`)
        console.log(player)
        return player;
    } catch (error) {
        throw new Error('Failed to fetch player');
    }
}
module.exports.getPlayerById = getPlayerById;


async function getPlayersByTeamId(teamId) {
    try {
        console.log(`svc.getPlayersByTeamId(${teamId})`)
        const players = await dbPlayer.get_players_by_team_id(teamId); // Assuming a database function to fetch a game
        console.log(`svc.players`)
        console.log(players)
        return players;
    } catch (error) {
        throw new Error('Failed to fetch players');
    }
}
module.exports.getPlayersByTeamId = getPlayersByTeamId;

async function getPlayersByTeamName(teamName) {
    try {
        console.log(`svc.getPlayersByTeamName(${teamName})`)
        const players = await dbPlayer.get_players_by_team_name(teamName); // Assuming a database function to fetch a game
        console.log(`svc.players`)
        console.log(players)
        return players;
    } catch (error) {
        throw new Error('Failed to fetch players');
    }
}
module.exports.getPlayersByTeamName = getPlayersByTeamName;

async function getPlayerStats() {
    try {
        console.log(`svc.getPlayerStats()`)
        const players = await dbPlayer.get_player_stats(); // Assuming a database function to fetch a game
        console.log(`svc.players`)
        console.log(players)
        return players;
    } catch (error) {
        throw new Error('Failed to fetch players');
    }
}
module.exports.getPlayerStats = getPlayerStats;

async function getPlayerData(playerId) {
    try {
        console.log(`svc.getPlayerData(${playerId})`)
        const player = await dbPlayer.get_player_data(playerId); // Assuming a database function to fetch a game
        console.log(`svc.player`)
        console.log(player)
        return player;
    } catch (error) {
        throw new Error('Failed to fetch player');
    }
}
module.exports.getPlayerData = getPlayerData;
