const express = require('express');
const app = express();
const router = express.Router();

//Basic Route
router.get('/', (req, res) => {
    res.send('Welcome to Homepage!')
})

//Dynamic Route that captures a user ID (parameter)
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    res.send(`Fetching Profile for User ID: ${userId}`)
})

//Mount router on /user route/path
app.use('/users', router);

app.listen(3000);