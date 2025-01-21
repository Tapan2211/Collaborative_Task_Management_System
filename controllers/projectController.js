const mongoose = require('mongoose');
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

// Update a project
const updateProject = async (req, res) => {
    const { title, description } = req.body;
    const { projectId } = req.params;

    try {
        // Find the project by ID and check if it exists
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if the user is the owner of the project
        if (project.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this project' });
        }

        // Update the project
        project.title = title || project.title;
        project.description = description || project.description;

        await project.save();

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a project
const deleteProject = async (req, res) => {
    const { projectId } = req.params;

    try {
        // Validate projectId
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ message: 'Invalid project ID' });
        }

        // Find the project by ID
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if the logged-in user is the owner of the project
        if (project.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to delete this project' });
        }

        // Delete the project
        await Project.findByIdAndDelete(projectId); // Use findByIdAndDelete instead of remove

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createProject, getProjects, deleteProject, updateProject };
