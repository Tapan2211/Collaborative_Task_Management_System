import axios from 'axios';

// const API_URL = '/api/projects';
const API_URL = '/api/v1/projects';

// Get all projects for the logged-in user
export const getProjects = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Create a new project
export const createProject = async (projectData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, projectData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Update an existing project
export const updateProject = async (projectId, projectData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${projectId}`, projectData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Delete a project
export const deleteProject = async (projectId) => {

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token is missing');
            return; // Handle accordingly
        }

        const response = await axios.delete(`${API_URL}/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data); // Log the response
        return response.data;
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error; // or handle the error as needed
    }
};
