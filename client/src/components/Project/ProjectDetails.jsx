import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjects } from '../../api/project';
import '../../styles/ProjectDetails.css';

const ProjectDetails = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            if (!projectId) {
                console.error('Invalid projectId');
                navigate('/projects');
                return;
            }

            try {
                const projects = await getProjects();
                const projectDetails = projects.find((p) => p._id === projectId);
                if (projectDetails) {
                    setProject(projectDetails);
                } else {
                    navigate('/projects'); // Redirect if project is not found
                }
            } catch (error) {
                console.error('Error fetching project details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projectId, navigate]);

    if (loading) {
        return <p>Loading project details...</p>;
    }

    if (!project) {
        return <p>Project not found.</p>;
    }

    return (
        <div className="project-details">
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <p>Created on: {new Date(project.creationDate).toLocaleDateString()}</p>
            <button onClick={() => navigate(`/tasks/${projectId}`)}>View Tasks</button>
        </div>
    );
};

export default ProjectDetails;
