const express = require('express');
const { createTask, getTasks, deleteTask, updateTask } = require('../controllers/taskController');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

router.route('/:projectId').get(protect, getTasks); // Get tasks by projectId
router.route('/').post(protect, createTask); // Create task

router.post('/task', createTask);
router.get('/tasks', getTasks);
router.delete('/task/:id', deleteTask);
router.put('/task/:id', updateTask);

module.exports = router;