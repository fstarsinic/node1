// gameController.js
const gameSvc = require('../modules/svc/gameService')

async function getPointsByGame(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/game/agg/points endpoint')
  try{
    rows = await gameSvc.getPointsByGame();
    console.log(`gamecontroller.rows:`);
    console.log(rows);
    if (rows.length == 0) {
      res.status(404).json({ error: `Results Not Found`});
      return;
    }
    res.json(rows);
    }
    catch (error) {
      res.status(500).json({ error: `Failed to fetch games: ${error.message}` });
    }
  }
  module.exports.getPointsByGame = getPointsByGame;
  

async function getPointsByTeam (req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  try {
    const rows = await gameSvc.getPointsByTeam();
    if (!rows?.length) {
      res.status(404).json({ error: `Results Not Found`});
      return;
    }
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch data` });
  }
}
module.exports.getPointsByTeam = getPointsByTeam;

async function getAccGameData(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/game/agg/agg endpoint')
  try{
    rows = await gameSvc.getAccGameData();
    console.log(`gamecontroller.rows:`);
    console.log(rows);
    if (rows.length == 0) {
      res.status(404).json({ error: `Results Not Found`});
      return;
    }
    res.json(rows);
    }
    catch (error) {
      res.status(500).json({ error: `Failed to fetch games: ${error.message}` });
    }
  }
  module.exports.getAccGameData = getAccGameData;


async function getPointsPerGame(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/game/agg/points endpoint')
  try{
    rows = await gameSvc.getPointsPerGame();
    console.log(`gamecontroller.rows:`);
    console.log(rows);
    if (rows.length == 0) {
      res.status(404).json({ error: `Results Not Found`});
      return;
    }
    res.json(rows);
    }
    catch (error) {
      res.status(500).json({ error: `Failed to fetch games: ${error.message}` });
    }
  }
  module.exports.getPointsPerGame = getPointsPerGame;

async function getLeagueStandings(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/game/agg/standings endpoint')
  try{
    rows = await gameSvc.getLeagueStandings();
    console.log(rows);
    if (!rows?.length) {
      res.status(404).json({ error: `Results Not Found`});
      return;
    }
    res.json(rows);
    }
    catch (error) {
      res.status(500).json({ error: `Failed to fetch games: ${error.message}` });
    }
  };
module.exports.getLeagueStandings = getLeagueStandings;


async function getGamesDeep(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/game/deep endpoint')
  try{
    const rows = gameSvc.getGamesDeep();
    console.log(`rows: ${rows}`);

    if (!rows?.length) {
      res.status(404).json({ error: `Results Not Found`});
      return;
    }    
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch games: ${error.message}` });
  }
};
module.exports.getGamesDeep = getGamesDeep;    


async function getAllGames(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/game endpoint');
  
  try {
    const rows = await gameSvc.getAllGames();
    console.log(`controller.rows:`);
    console.log(rows);

    if (!rows?.length) {
      res.status(404).json({ error: `Results Not Found` });
    } else {
      res.json(rows);
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch games: ${error.message}` });
  }
};
module.exports.getAllGames = getAllGames;

async function getGameById(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const gameid = req.params.id;
  console.log(`/api/game/:${gameid} endpoint`)  
  try{
    rows = await gameSvc.getGameById(gameid);
      if (!rows?.length) {
        res.status(404).json({ error: `Results Not Found for ${gameid}`});
        return;
      }
      res.json(rows);
  }      
  catch (error) {
    res.status(500).json({ error: `Failed to fetch games: ${error.message}` });
  }
};
module.exports.getGameById = getGameById;


async function getGamesByTeamId(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const teamId = req.params.id;
  console.log(`/api/game/FindByTeamId/:${teamId} endpoint`)
  try{
    rows = await gameSvc.getGamesByTeamId(teamId);
      if (!rows?.length) {
        res.status(404).json({ error: `Results Not Found for ${teamId}`});
        return;
      }
      res.json(rows);
  }
  catch (error) {
    res.status(500).json({ error: `Failed to fetch games: ${error.message}` });
  }
};
module.exports.getGamesByTeamId = getGamesByTeamId;


async function getGamesByTeamName(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const teamName = req.params.teamName;
  console.log(`/api/game/FindByName/:${teamName} endpoint`)
  try{
    rows = await gameSvc.getGamesByTeamName(teamName);
      if (!rows?.length) {
        res.status(404).json({ error: `Results Not Found for ${teamName}`});
        return;
      }
      res.json(rows);
  }
  catch (error) {
    res.status(500).json({ error: `Failed to fetch games: ${error.message}` });
  }
};
module.exports.getGamesByTeamName = getGamesByTeamName;


async function getGameWinner(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const gameId = req.params.id;
  console.log(`/api/game/winner/:${gameId} endpoint`)
  try{
    rows = await gameSvc.getGameWinner(gameId);
      if (!rows?.length) {
        res.status(404).json({ error: `Results Not Found for ${gameId}`});
        return;
      }
      res.json(rows);
  }
  catch (error) {
    res.status(500).json({ error: `Failed to fetch games: ${error.message}` });
  }
};
module.exports.getGameWinner = getGameWinner;


async function getGameResults(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const gameId = req.params.id;
  console.log(`/api/game/results/:${gameId} endpoint`)
  try{
    rows = await gameSvc.getGameResults(gameId);
      if (!rows?.length) {
        res.status(404).json({ error: `Results Not Found for ${gameId}`});
        return;
      }
      res.json(rows);
  }
  catch (error) {
    res.status(500).json({ error: `Failed to fetch games: ${error.message}` });
  }
};
module.exports.getGameResults = getGameResults;
