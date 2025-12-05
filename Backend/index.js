const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./src/config/database');

dotenv.config();
connectDB(); 

const app = express();

const corsOptions = {
    origin: [
        'http://localhost:3001', 
        'http://localhost:3000', 
        'https://weddinginvitation-production-a4b6.up.railway.app',
        'https://wedding-invitation-ten-blue.vercel.app/',
    ],
    
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rsvpRoutes = require('./src/routes/rsvp.route');
const commonRoutes = require('./src/routes/common.route');

app.use('/api/rsvp', rsvpRoutes);
app.use('/', commonRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});