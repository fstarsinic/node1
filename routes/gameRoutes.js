const express = require('express');
const router = express.Router();


console.log('Setting up Game Routes')


const gameController = require('../controllers/gameController');

// Define routes and their corresponding controller functions
router.get('/', gameController.getAllgames);

// In gameRoutes.js
router.get('/:id', gameController.getGameById);

// In gameRoutes.js
router.get('/:teamName', gameController.getGameByTeamName);

// Export the router
module.exports = router;

