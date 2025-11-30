const express = require('express');
const router = express.Router();

const rsvpController = require('../controllers/rsvp.controller');

router.post('/submit', rsvpController.submitRsvp);

module.exports = router;