const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

console.log('Setting up Routes')

// Define routes and their corresponding controller functions
router.get('/', teamController.getAllteams);

// In teamRoutes.js
router.get('/:id', teamController.getteamById);

// Export the router
module.exports = router;

