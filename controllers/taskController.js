const mongoose = require('mongoose');
const Task = require('../models/Task');
const Project = require('../models/Project');

// Create Task
const createTask = async (req, res) => {
    const { title, description, status, deadline, assignedUser, projectId } = req.body;

    if (!projectId) {
        return res.status(400).json({ message: 'Project ID is required' });
    }

    try {
        // Validate if the project exists
        const projectExists = await Project.findById(projectId);
        if (!projectExists) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const newTask = new Task({
            title,
            description,
            status,
            deadline,
            assignedUser,
            project: projectId,
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get Tasks for a Project
const getTasks = async (req, res) => {
    const { projectId } = req.params;

    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: 'Invalid or missing projectId.' });
    }

    try {
        const tasks = await Task.find({ project: projectId });
        if (!tasks.length) {
            return res.status(404).json({ message: 'No tasks found for this project.' });
        }
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createTask, getTasks, deleteTask, updateTask };
