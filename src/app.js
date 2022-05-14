const express = require('express');

// routes
const { userRouter } = require('./routes/users.routes');
const { restaurantRouter } = require('./routes/restaurant.routes');

const app = express();

app.use(express.json());

// endpoints
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantRouter);
module.exports = { app };
