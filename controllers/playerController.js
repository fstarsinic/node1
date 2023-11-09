// playerController.js
const bus = require('../modules/bus/busPlayer')

/**
 * @swagger
 * /api/player:
 *   get:
 *     summary: Get a list of players
 *     description: Retrieve a list of players from the database.
 *     responses:
 *       200:
 *         description: A list of players.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 */
exports.getAllPlayers = (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/player endpoint')
      bus.get_players((err, rows) => {
        if (rows.length == 0) {
          res.status(404).json({ error: `Results Not Found.`});
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
 * /api/player/{playerId}:
 *   get:
 *     summary: Get a player by player ID
 *     description: Retrieve a player's information by their player ID.
 *     parameters:
 *       - in: path
 *         name: playerId
 *         description: The ID of the player to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved player information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the player.
 *                 name:
 *                   type: string
 *                   description: The name of the player.
 *       '404':
 *         description: Player not found.
 */
exports.getPlayerById = (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const playerid = req.params.id;
  console.log(`/api/player/:${playerid} endpoint`)
  
    console.log(`num ${playerid}`)
      bus.get_player_by_id(playerid, (err, rows) => {
        if (rows.length == 0) {
          res.status(404).json({ error: `Results Not Found for ${playerid}`});
          return;
        }
        if (err) {
          res.status(500).json({ error: err.message });
        return;
        }
        res.json(rows);
  });      
};

