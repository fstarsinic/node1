const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

console.log('Setting up Routes')

// Define routes and their corresponding controller functions
router.get('/', playerController.getAllPlayers);

// In playerRoutes.js
router.get('/:id', playerController.getPlayerById);

// Export the router
module.exports = router;

