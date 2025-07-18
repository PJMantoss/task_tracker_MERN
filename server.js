require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();

// Init Middleware
app.use(express.json());
app.use(require('cors')());

app.get('/', (req, res) => res.send('API Running'));