const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

console.log('Setting up Player Routes')

// Define routes and their corresponding controller functions
router.get('/', playerController.getAllPlayers);

// In playerRoutes.js
router.get('/:id', playerController.getPlayerById);

router.get('/FindByName/:teamName', playerController.getPlayersByTeamName);

router.get('/byTeamId/:id', playerController.getPlayersByTeamId);

router.get('/stats/playerStats', playerController.getPlayerStats);

router.get('/stats/playerDataById/:id', playerController.getPlayerDataById);

router.get('/search/findByPlayerName', playerController.getPlayerByName);

// Export the router
module.exports = router;
