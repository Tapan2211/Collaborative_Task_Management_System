const Task = require('../models/Task');

const createTask = async (req, res) => {
    const { title, description, status, deadline, assignedUser, projectId } = req.body;

    try {
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
        res.status(500).json({ message: 'Server error', error });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createTask, getTasks };
