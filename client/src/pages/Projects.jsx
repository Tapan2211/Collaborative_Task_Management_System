import React, { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../api/project';
import ProjectForm from '../components/Project/ProjectForm';
import '../styles/Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch all projects
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Handle project creation or update
    const handleCreateOrUpdate = async (projectData) => {
        try {
            if (editingProject) {
                await updateProject(editingProject._id, projectData);
            } else {
                await createProject(projectData);
            }
            setEditingProject(null);
            refreshProjects();
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    // Handle project deletion
    const handleDelete = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(projectId);
                refreshProjects();
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    // Refresh projects after any operation
    const refreshProjects = async () => {
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (error) {
            console.error('Error refreshing projects:', error);
        }
    };

    if (loading) {
        return <p>Loading projects...</p>;
    }

    return (
        <div className="projects-page">
            <h1>Projects</h1>
            <ProjectForm
                onSubmit={handleCreateOrUpdate}
                initialData={editingProject}
            />
            <div className="project-list">
                {projects.map((project) => (
                    <div key={project._id} className="project-card">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <p>Created on: {new Date(project.creationDate).toLocaleDateString()}</p>
                        <div className="project-card-actions">
                            <button onClick={() => setEditingProject(project)}>Edit</button>
                            <button onClick={() => handleDelete(project._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
