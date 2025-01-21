const express = require('express');
const { createProject, getProjects, deleteProject, updateProject } = require('../controllers/projectController');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

router.route('/').post(protect, createProject).get(protect, getProjects);

router.route('/:projectId')
    .put(protect, updateProject)   // Update a project by ID
    .delete(protect, deleteProject); // Delete a project by ID
module.exports = router;
