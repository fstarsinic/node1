const express = require('express');
const db = require('./modules/db')
const bus = require('./modules/bus')
//const DataTable = require('datatables');
const cors = require('cors');
const app = express();
const path = require('path');
const port = process.env.port || 80;

// Enable CORS for all routes
app.use(cors());

console.log('doing something')
console.log(path.join(__dirname, 'public', 'index.html'))
console.log('doing something else')

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use('/sbadmin', express.static('sbadmin'));
app.use('/images', express.static('images'));
app.set('view engine', 'ejs');


app.get('/dashboard', (req, res) => {
    const numValue = req.query.num ? req.query.num : 10;

    res.render('dashboard', { pageTitle: 'Dashboard',
        body: 'This is the main content of the dashboard page.', 
        num: numValue,
    });
  });
  
  app.get('/', (req, res) => {

    res.render('index', { pageTitle: 'Index',
        body: 'This is the main content of the dashboard page.', 
    });
  });
  

  app.get('/players', (req, res) => {
    console.log('/players page')
    res.render('players', { pageTitle: 'Players',
        body: 'This is the main content of the Players page.', 
    });
  });
  
  app.get('/hichart', (req, res) => {
    console.log('Server got index request')
    //res.send('got index request')
    console.log(path.join(__dirname, 'public', 'hichart.html'))
    res.sendFile(path.join(__dirname, 'public', 'hichart.html'));
  });
  
// Define a route to fetch data from the database
app.get('/api/players', (req, res) => {
    console.log('/api/players endpoint')
        db.get_player_stats((err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json(rows);
          });      
  });


  app.get('/team', (req, res) => {
    console.log('/team page')    
    res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
    res.render('team', { pageTitle: 'Team',
        body: 'This is the main content of the  Team page.', 
    });
  });
  

/**
 * @swagger
 * /api/team:
 *   get:
 *     summary: Get all teams
 *     description: Retrieve a list of all teams.
 *     responses:
 *       '200':
 *         description: Successfully retrieved a list of teams.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the team.
 *                   name:
 *                     type: string
 *                     description: The name of the team.
 */
app.get('/api/team', (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/team endpoint')
      bus.get_teams((err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json(rows);
        });      
});


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
 *         description: Team not found.
 */
app.get('/api/team/:teamid', (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/team/:teamid endpoint')
  const teamid = req.params.teamid;
    console.log(`num ${teamid}`)
      bus.get_team_by_id(teamid, (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json(rows);
        });      
});

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
app.get('/api/player', (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/player endpoint')
      bus.get_players((err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json(rows);
        });      
});

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
app.get('/api/player/:playerid', (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/player/:playerid endpoint')
  const playerid = req.params.playerid;
    console.log(`num ${playerid}`)
      bus.get_player_by_id(playerid, (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json(rows);
        });      
});


// Define a route to fetch data from the database
app.get('/api/teamgames', (req, res) => {
  console.log('/api/teamgames endpoint')
  const numValue = req.query.num ? req.query.num : 7;
  console.log(`num ${numValue}`)
      bus.get_team_game_data(numValue, (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json(rows);
        });      
});

// Define a route to fetch data from the database
app.get('/api/game', (req, res) => {
  console.log('/api/games endpoint')
  const team1 = req.query.team1 ? req.query.team1 : 1;
  const team2 = req.query.team2 ? req.query.team2 : 5;
  const game = req.query.game ? req.query.game : 1;
  console.log(`/api/games ${team1}, ${team2}, ${game}`)
      bus.get_game_results(team1, team2, game, (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json(rows);
        });      
});

// Define a route to fetch data from the database
app.get('/api/games', (req, res) => {
  console.log('/api/games endpoint')
  const teamId = req.query.teamId ? req.query.teamId : 1;
  console.log(`/api/games ${teamId}`)
      bus.get_games_by_team(teamId, (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json(rows);
        });      
});


// Define a route to fetch data from the database
app.get('/api/points', (req, res) => {
    console.log('/points_per_game_data()')
    var num = req.query.num;
    if (typeof num == 'undefined'){
        num = 10
    }

    const numcheck = parseInt(num);
    if (isNaN(num)){
        res.send('Querystring value must be an integer')
    }
    else{
        db.get_top_ppg(num, (err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json(rows);
          });      
    }
  });

// Define a route to fetch data from the database
app.get('/api/turnovers', (req, res) => {
    console.log('/turnover_data()')
    var num = req.query.num;
    if (typeof num == 'undefined'){
        num = 10
    }

    const numcheck = parseInt(num);
    if (isNaN(num)){
        res.send('Querystring value must be an integer')
    }
    else{
        db.get_top_turnovers(num, (err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json(rows);
          });      
    }
  });
  
// Define a route to fetch data from the database
app.get('/api/rebounds', (req, res) => {
    console.log('/rebounds_data()')
    var num = req.query.num;
    if (typeof num == 'undefined'){
        num = 10
    }

    const numcheck = parseInt(num);
    if (isNaN(num)){
        res.send('Querystring value must be an integer')
    }
    else{
        db.get_top_rebounds(num, (err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json(rows);
          });      
    }
  });

// Define a route to fetch data from the database
app.get('/api/summary', (req, res) => {
    console.log('/summary()')

        db.get_multi((err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json(rows);
          });      
  });
  

// Define an endpoint that displays "Hello World"
app.get('/hello', (req, res) => {
    console.log('Testing hello world...')
    res.send('Hello World');
  });
  
  


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
    console.log('Testing...')
});
