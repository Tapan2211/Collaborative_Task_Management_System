import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../api/project'; // Assuming this function fetches projects from an API or state
import '../../styles/ProjectsList.css';

function ProjectsList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const fetchedProjects = await getProjects();
                setProjects(fetchedProjects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return <p>Loading projects...</p>;
    }

    return (
        <div className="projects-list">
            <h2>Projects</h2>
            {projects.length === 0 ? (
                <p>No projects available.</p>
            ) : (
                <ul>
                    {projects.map((project) => (
                        <li key={project._id}>
                            <Link to={`/projects/${project._id}`}>{project.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProjectsList;
