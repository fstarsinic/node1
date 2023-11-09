// teamController.js
const bus = require('../modules/bus/busTeam')

/**
 * @swagger
 * /api/team:
 *   get:
 *     summary: Get a list of teams
 *     description: Retrieve a list of teams from the database.
 *     responses:
 *       200:
 *         description: A list of teams.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/team'
 */
exports.getAllteams = (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/team endpoint')
      bus.get_teams((err, rows) => {
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
 * /api/team/{teamId}:
 *   get:
 *     summary: Get a team by team ID
 *     description: Retrieve a team's information by their team ID.
 *     parameters:
 *       - in: path
 *         name: teamId
 *         description: The ID of the team to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved team information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the team.
 *                 name:
 *                   type: string
 *                   description: The name of the team.
 *       '404':
 *         description: team not found.
 */
exports.getteamById = (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const teamid = req.params.id;
  console.log(`/api/team/:${teamid} endpoint`)
    console.log(`num ${teamid}`)
      bus.get_team_by_id(teamid, (err, rows) => {
        if (rows.length == 0) {
          res.status(404).json({ error: `Results Not Found for ${teamid}`});
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
 * /api/game/{teamName}:
 *  get:
 *   summary: Get a team by team name
 *   description: Retrieve a team's information by their team name.
 *  parameters:
 *    - in: path
 *      name: teamName
 *      description: The name of the team to retrieve.
 *      required: true
 *      schema:
 *      type: string
 * responses:
 * '200':
 *    description: Successfully retrieved game information.
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *            properties:
 *              id:
 *                type: integer
 *                description: The ID of the game.
 *              name:
 *                type: string
 *                description: The name of the game.
 * '404':
 *    description: game not found.
 * 
 */
exports.getTeamByTeamName = (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const teamName = req.params.teamName;
  console.log(`/api/game/:${teamName} endpoint`)
  bus.get_team_by_team_name(teamName, (err, rows) => {
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