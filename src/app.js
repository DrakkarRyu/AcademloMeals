const express = require('express');
const { globalErrorHandler } = require('./controllers/errors.controller');

// routes
const { userRouter } = require('./routes/users.routes');
const { restaurantRouter } = require('./routes/restaurant.routes');
const { mealRouter } = require('./routes/meal.routes');

const app = express();

app.use(express.json());

// endpoints
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meal', mealRouter);

//Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
