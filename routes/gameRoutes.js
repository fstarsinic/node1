const express = require('express');
const router = express.Router();


console.log('Setting up Game Routes')


const gameController = require('../controllers/gameController');

// Define routes and their corresponding controller functions
router.get('/', gameController.getAllGames);

router.get('/:id', gameController.getGameById);

router.get('/FindByName/:teamName', gameController.getGamesByTeamName);

router.get('/winner/:id', gameController.getGameWinner);

router.get('/results/:id', gameController.getGameResults);

router.get('/find/deep', gameController.getAllGamesDeep);

router.get('/agg/standings/', gameController.getLeagueStandings);

// Export the router
module.exports = router;

