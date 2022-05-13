const express = require('express');

// routes
const { userRouter } = require('./routes/users.routes');

const app = express();

app.use(express.json());

// endpoints
app.use('/api/v1/users', userRouter);

module.exports = { app };
