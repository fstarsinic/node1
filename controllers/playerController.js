// playerController.js
const playerSvc = require('../modules/svc/playerService')
//const bodyParser = require('body-parser');

async function getPlayerByName(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const { firstname, lastname } = req.query;
  console.log(`/api/player/getPlayerByName:${firstname}/:${lastname} endpoint`)
  try {
    const rows = await playerSvc.getPlayerByName(firstname, lastname);
    console.log('controller.rows')
    console.log(rows)
    if (!rows) {
      res.status(404).json({ error: `Results Not Found for ${firstname} ${lastname}`});
      return;
    }
    console.log('controller')
    console.log(rows)
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch player: ${error.message}` });
  }
}
module.exports.getPlayerByName = getPlayerByName;

async function addPlayer(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('playerController.addPlayer')
  console.log('body')
  console.log(req.body)
  const { firstName, lastName, active, injured, playerNumber} = req.body;
  console.log(`/api/player/addPlayer:${firstName}/:${lastName}/:${playerNumber} endpoint`)
  try {
    const rows = await playerSvc.addPlayer(firstName, lastName, active, injured, playerNumber);
    console.log('controller.rows')
    console.log(rows)
    if (!rows) {
      res.status(404).json({ error: `Results Not Found for ${firstname} ${lastname}`});
      return;
    }
    console.log('controller')
    console.log(rows)
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Failed to add player: ${error.message}` });
  }
}
module.exports.addPlayer = addPlayer;

async function getPointsByTeam(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const teamId = req.params.id;
  console.log(`/api/player/points/:${teamId} endpoint`)
  try {
    const rows = await playerSvc.getPointsByTeam(teamId);
    if (!rows?.length) {
      res.status(404).json({ error: `Results Not Found for ${teamId}`});
      return;
    }
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch points: ${error.message}` });
  }
}

async function getAllPlayers(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/player endpoint');
  try {
    rows = await playerSvc.getPlayers();
      if (!rows?.length) {
        res.status(404).json({ error: `Results Not Found.`});
        return;
      }    
      res.json(rows);      
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch players: ${error.message}` });
    }
  };
module.exports.getAllPlayers = getAllPlayers;


async function getPlayerById(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const playerid = req.params.id;
  console.log(`/api/player/:${playerid} endpoint`) 
  try {
    const player = await playerSvc.getPlayerById(playerid);
    if (!rows?.length) {
      res.status(404).json({ error: `Results Not Found for ${playerid}`});
      return;
    }
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch player: ${error.message}` });
  }
};
module.exports.getPlayerById = getPlayerById;


async function getPlayersByTeamId(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const teamId = req.params.id;
  console.log(`/api/player/:${teamId} endpoint`)
  try {
    const rows = await playerSvc.getPlayersByTeamId(teamId);
    if (!rows?.length) {
      res.status(404).json({ error: `Results Not Found for ${teamId}`});
      return;
    }
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch players: ${error.message}` });
  }
};
module.exports.getPlayersByTeamId = getPlayersByTeamId;


async function getPlayersByTeamName(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const teamName = req.params.teamName;
  console.log(`/api/player/:${teamName} endpoint`)
  try {
    const rows = await playerSvc.getPlayersByTeamName(teamName);
    if (!rows?.length) {
      res.status(404).json({ error: `Results Not Found for ${teamName}`});
      return;
    }
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch players: ${error.message}` });
  }
};
module.exports.getPlayersByTeamName = getPlayersByTeamName;

async function getPlayerStatsArray(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/player endpoint')
  try {
    const rows = await getPlayerStats();
    if (!rows?.length) {
      res.status(404).json({ error: `Results Not Found.`});
      return;
    }    
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch stats: ${error.message}` });
  }
}

async function getPlayerStats(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/player endpoint')
  try {
    const rows = await playerSvc.getPlayerStats();
    if (!rows?.length) {
      res.status(404).json({ error: `Results Not Found.`});
      return;
    }    
    //res.json(rows);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch stats: ${error.message}` });
  }
}
module.exports.getPlayerStats = getPlayerStats;


async function getPlayerDataById(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const playerid = req.params.id;
  console.log(`/api/stats/getPlayerDataById/:${playerid} endpoint`)
  try {
    const rows = await playerSvc.getPlayerData(playerid);
    if (!rows?.length) {
      res.status(404).json({ error: `Results Not Found.`});
      return;
    }    
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch player: ${error.message}` });
  }
};
module.exports.getPlayerDataById = getPlayerDataById;

