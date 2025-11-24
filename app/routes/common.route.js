// rsvp-backend/app/routes/common.route.js
const express = require('express');
const router = express.Router();
const commonController = require('../controllers/common.controller');

// Endpoint GET: /redirect
router.get('/redirect', commonController.handleRedirect);

module.exports = router;