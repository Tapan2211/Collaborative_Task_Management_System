const Project = require('../models/Project');

const createProject = async (req, res) => {
    const { title, description } = req.body;

    try {
        const newProject = new Project({
            title,
            description,
            owner: req.user.id,
            creationDate: new Date(),
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user.id });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createProject, getProjects };
