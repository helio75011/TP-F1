require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const timerRoutes = require('./routes/timerRoutes');

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/', timerRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
