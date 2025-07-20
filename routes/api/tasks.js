const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Task = require('../../models/Task');

//GET api/tasks: Get all user's tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ date: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});