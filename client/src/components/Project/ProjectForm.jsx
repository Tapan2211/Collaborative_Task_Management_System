import React, { useState } from 'react';
import '../../styles/ProjectForm.css';

const ProjectForm = ({ onSubmit, initialData = {} }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [description, setDescription] = useState(initialData.description || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description });
        setTitle('');
        setDescription('');
    };

    return (
        <form className="project-form" onSubmit={handleSubmit}>
            <h2>{initialData.title ? 'Edit Project' : 'Create Project'}</h2>
            <input
                type="text"
                placeholder="Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>
            <button type="submit">{initialData.title ? 'Update' : 'Create'}</button>
        </form>
    );
};

export default ProjectForm;
