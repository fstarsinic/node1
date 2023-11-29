const express = require('express');
const router = express.Router();


console.log('Setting up Game Routes')


const gameController = require('../controllers/gameController');

// Define routes and their corresponding controller functions
router.get('/', gameController.getAllGames);

router.get('/:id', gameController.getGameById);

router.get('/FindByName/:teamName', gameController.getGamesByTeamName);

router.get('/FindByTeamId/:id', gameController.getGamesByTeamId);

router.get('/winner/:id', gameController.getGameWinner);

router.get('/results/:id', gameController.getGameResults);

router.get('/find/deep', gameController.getGamesDeep);

router.get('/agg/standings/', gameController.getLeagueStandings);

router.get('/agg/points/', gameController.getPointsPerGame);

router.get('/agg/gamedata', gameController.getAccGameData);

//router.get('/agg/teams', gameController.getTeamGameData);

router.get('/agg/pointsByTeam', gameController.getPointsByTeam);

router.get('/agg/pointsByGame', gameController.getPointsByGame);

// Export the router
module.exports = router;

