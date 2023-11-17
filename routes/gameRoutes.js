const express = require('express');
const router = express.Router();


console.log('Setting up Game Routes')


const gameController = require('../controllers/gameController');

// Define routes and their corresponding controller functions
router.get('/', gameController.getAllgames);

router.get('/:id', gameController.getGameById);

router.get('/FindByName/:teamName', gameController.getGamesByTeamName);

router.get('/winner/:gameId', gameController.getGameWinner);

router.get('/results/:gameId', gameController.getGameResults);




// Export the router
module.exports = router;

