// fileUploadRoutes.js

const express = require('express');
const router = express.Router();
const fileUploadController = require('../controllers/fileUploadController');

// Define a route for handling CSV file uploads
router.post('/', fileUploadController.handleFileUpload);

module.exports = router;
