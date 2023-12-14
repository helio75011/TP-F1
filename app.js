const express = require('express');
const connectDB = require("./config/db");
const dotenv = require('dotenv').config();
const port = 3000;
const userRoutes = require('./routes/userRoutes');
const timerRoutes = require('./routes/timerRoutes');

connectDB();

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/', timerRoutes);

app.listen(port, () => console.log("le serveur a démarré au port " + port));