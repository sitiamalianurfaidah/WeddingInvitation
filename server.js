// rsvp-backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Import & Gunakan Routes
const rsvpRoutes = require('./app/routes/rsvp.route');
const commonRoutes = require('./app/routes/common.route');

app.use('/api/rsvp', rsvpRoutes); // Rute untuk API RSVP
app.use('/', commonRoutes);        // Rute untuk endpoint web umum (Redirect)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});