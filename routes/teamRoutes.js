const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

console.log('Setting up Team Routes')

router.get('/findByName/:teamName', teamController.getTeamByName);

router.get('/byTeamId/:id', teamController.getTeamById); // This is the same as the one above TODO: Remove this one?

router.get('/scorecard/:id', teamController.getTeamScorecard);

//router.get('/teamGames/:id', teamController.getTeamGames);

router.get('/gameResults/:id', teamController.getTeamGameResults);

router.get('/gameData/:id', teamController.getTeamGameData);

// In teamRoutes.js
router.get('/:id', teamController.getTeamById);

// Define routes and their corresponding controller functions
router.get('/', teamController.getAllteams);



// Export the router
module.exports = router;

