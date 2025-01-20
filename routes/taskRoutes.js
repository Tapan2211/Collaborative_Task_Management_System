const express = require('express');
const { createTask, getTasks } = require('../controllers/taskController');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

router.route('/:projectId').get(protect, getTasks);
router.route('/').post(protect, createTask);

module.exports = router;
