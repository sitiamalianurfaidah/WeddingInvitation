// rsvp-backend/app/routes/rsvp.route.js
const express = require('express');
const router = express.Router();
const rsvpController = require('../controllers/rsvp.controller');

// Endpoint POST: /api/rsvp/submit
router.post('/submit', rsvpController.submitRsvp);

module.exports = router;