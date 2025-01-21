import axios from 'axios';

const API_URL = '/api/v1/tasks';

export const getTasks = async (projectId) => {
    try {
        const token = localStorage.getItem('token');
        console.log('Project ID:', projectId); // Debug projectId
        console.log('API URL:', `${API_URL}/${projectId}`); // Debug full API URL

        if (!projectId) {
            throw new Error('Invalid projectId: Missing or undefined.');
        }

        const response = await axios.get(`${API_URL}/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error in getTasks:', error.response?.data || error.message);
        throw error;
    }
};



// Create a new task
export const createTask = async (taskData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Update an existing task
export const updateTask = async (taskId, taskData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${taskId}`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Delete a task
export const deleteTask = async (taskId) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
