const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

console.log('Setting up Game Routes')

// Define routes and their corresponding controller functions
router.get('/', gameController.getAllgames);

// In gameRoutes.js
router.get('/:id', gameController.getgameById);

// Export the router
module.exports = router;

