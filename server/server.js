const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/dbConnect.js');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const resourceRoutes = require('./routes/resourceRoutes.js');
const opportunityRoutes = require('./routes/opportunityRoutes.js');
const eventRoutes = require('./routes/eventRoute.js');
const bookmarkRoutes = require('./routes/bookmarkRoutes.js');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));



// ... your existing middleware, db connect, etc.

// mount bookmark routes

// ... your other routes, error handling, app.listen...


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

dbConnect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
