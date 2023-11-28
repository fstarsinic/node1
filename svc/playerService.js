const dbPlayer = require('../db/dbPlayer');
const dbTeam = require('../db/dbTeam');

async function getPlayerByName(firstname, lastname) {
    try {
        console.log(`svc.getPlayerByName(${firstname}, ${lastname})`)
        const player = await dbPlayer.get_player_by_name(firstname, lastname); // Assuming a database function to fetch a game
        console.log(`getting player`)
        console.log(player)
        playername = player[0].name;
        playerteam = player[0].team_id;
        playerid = player[0].id //TODO use to get total points or whatevs.

        const team = await dbTeam.get_team_by_id(playerteam);
        console.log(`getting team`)
        console.log(team)
        teamname = team[0].team_name;
        console.log(teamname)
        console.log(playername) 
        upperPlayer = playername.toUpperCase();
        console.log(upperPlayer)
        return {'player': upperPlayer, 'team': teamname};
    } catch (error) {
        throw new Error('Failed to fetch player');
    }
}
module.exports.getPlayerByName = getPlayerByName;

async function addPlayer(firstName, lastName, active, injured, playerNumber) {
    try {
        console.log(`svc.addPlayer(${firstName}, ${lastName}, ${active}, ${injured}, ${playerNumber})`)
        const player = await dbPlayer.add_player(firstName, lastName, active, injured, playerNumber); // Assuming a database function to fetch a game
        console.log(`svc.player`)
        console.log(player)
        return player;
    } catch (error) {
        throw new Error('Failed to fetch player');
    }
}
module.exports.addPlayer = addPlayer;


async function getPointsByTeam(teamId) {
    try {
        console.log('svc.getPointsByTeam()')
        const points = await dbPlayer.get_points_by_team(teamId); // Assuming a database function to fetch games
        console.log(`svc.points`)
        console.log(points)
        return points;
    } catch (error) {
        throw new Error(`Failed to fetch points: ${error.message}`);
    }
}

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
