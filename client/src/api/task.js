import axios from 'axios';

const API_URL = '/api/tasks';

// Get all tasks for a specific project
export const getTasks = async (projectId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
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
