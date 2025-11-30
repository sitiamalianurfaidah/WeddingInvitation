const express = require('express');
const router = express.Router();

const rsvpController = require('../controllers/rsvp.controller');

router.post('/submit', rsvpController.submitRsvp);
router.get('/list', rsvpController.getAllRsvps);
router.delete('/delete/:id', rsvpController.deleteRsvp);

module.exports = router;