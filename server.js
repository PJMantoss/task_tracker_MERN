require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();

// Init Middleware
app.use(express.json());
app.use(require('cors')());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/tasks', require('./routes/api/tasks'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
