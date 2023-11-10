// gameController.js
const bus = require('../modules/bus/busGame')

/**
 * @swagger
 * /api/game:
 *   get:
 *     summary: Get a list of games
 *     description: Retrieve a list of games from the database.
 *     responses:
 *       200:
 *         description: A list of games.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 - $ref: '#/components/schemas/game'
 */
exports.getAllgames = (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/game endpoint')
  bus.get_games((err, rows) => {
    if (rows.length == 0) {
      res.status(404).json({ error: `Results Not Found`});
      return;
    }    
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
      res.json(rows);
    });      
};

/**
 * @swagger
 * /api/game/{gameId}:
 *   get:
 *     summary: Get a game by game ID
 *     description: Retrieve a game's information by their game ID.
 *     parameters:
 *       - in: path
 *         name: gameId
 *         description: The ID of the game to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved game information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the game.
 *                 name:
 *                   type: string
 *                   description: The name of the game.
 *       '404':
 *         description: game not found.
 */
exports.getGameById = (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const gameid = req.params.id;
  console.log(`/api/game/:${gameid} endpoint`)  
  bus.get_game_by_id(gameid, (err, rows) => {
    if (rows.length == 0) {
      res.status(404).json({ error: `Results Not Found for ${gameid}`});
      return;
    }
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
    });      
};


exports.getGamesByTeamName = (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const teamName = req.params.teamName;
  console.log(`/api/game/byTeamName/:${teamName} endpoint`)
  bus.get_games_by_team_name(teamName, (err, rows) => {
    if (rows.length == 0) {
      res.status(404).json({ error: `Results Not Found for ${teamName}`});
      return;
    }
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
    });
};

exports.getGameWinner = (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const gameId = req.params.gameId;
  console.log(`/api/game/winner/:${gameId} endpoint`)
  bus.get_game_winner(gameId, (err, rows) => {
    if (rows.length == 0) {
      res.status(404).json({ error: `Results Not Found for ${gameId}`});
      return;
    }
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
    });
}

exports.getGameResults = (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const gameId = req.params.gameId;
  console.log(`/api/game/results/:${gameId} endpoint`)
  bus.get_game_results(gameId, (err, rows) => {
    if (rows.length == 0) {
      res.status(404).json({ error: `Results Not Found for ${gameId}`});
      return;
    }
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
    });
}
