const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

console.log('Setting up Player Routes')

router.get('/topPoints', playerController.getTopPoints);
router.get('/topRebounds', playerController.getTopRebounds);
router.get('/topAssists', playerController.getTopAssists);
//router.get('/topThrees', playerController.getTopThrees);
//router.get('/topFG', playerController.getTopFG);

router.get('/pie', playerController.getPie);

router.get('/FindByName/:teamName', playerController.getPlayersByTeamName);

router.get('/byTeamId/:id', playerController.getPlayersByTeamId);

router.get('/stats/playerStats', playerController.getPlayerStats);

router.get('/stats/playerDataById/:id', playerController.getPlayerDataById);

router.get('/search/findByPlayerName', playerController.getPlayerByName);

router.post('/addPlayer', playerController.addPlayer);

// In playerRoutes.js
router.get('/:id', playerController.getPlayerById);

// Define routes and their corresponding controller functions
router.get('/', playerController.getAllPlayers);

// Export the router
module.exports = router;
