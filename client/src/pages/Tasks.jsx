import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskList from '../components/Task/TaskList';
import TaskForm from '../components/Task/TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from '../api/task';

const Tasks = () => {
    const { projectId } = useParams(); // Extract projectId from the route
    console.log("projectIdTask", projectId)
    const [tasks, setTasks] = useState([]); // State for tasks
    const [editingTask, setEditingTask] = useState(null); // State for task being edited
    const [searchTerm, setSearchTerm] = useState(''); // State for search
    const [statusFilter, setStatusFilter] = useState(''); // State for status filter
    const [assignedUserFilter, setAssignedUserFilter] = useState(''); // State for assigned user filter

    // Fetch tasks when the component mounts or projectId changes
    useEffect(() => {
        console.log('Extracted projectId:', projectId);
        if (projectId) {
            fetchTasks();
        } else {
            console.error('Project ID is missing or invalid:', projectId);
        }
    }, [projectId]);

    // Function to fetch tasks for the current project
    const fetchTasks = async () => {
        try {
            console.log('Fetching tasks for projectId:', projectId);
            const data = await getTasks(projectId);
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error.response?.data || error.message);
            alert('Failed to fetch tasks. Please try again.');
        }
    };

    // Handle task creation or update
    const handleCreateOrUpdateTask = async (taskData) => {
        try {
            if (editingTask) {
                await updateTask(editingTask._id, taskData); // Update task
            } else {
                await createTask({ ...taskData, projectId }); // Create new task
            }
            setEditingTask(null); // Clear editing state
            fetchTasks(); // Refresh task list
        } catch (error) {
            console.error('Error saving task:', error.response?.data || error.message);
            alert('Failed to save task. Please try again.');
        }
    };

    // Handle task deletion
    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            fetchTasks(); // Refresh task list
        } catch (error) {
            console.error('Error deleting task:', error.response?.data || error.message);
            alert('Failed to delete task. Please try again.');
        }
    };

    // Filter tasks based on search term, status, and assigned user
    const filteredTasks = tasks
        .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((task) => !statusFilter || task.status === statusFilter)
        .filter((task) => !assignedUserFilter || task.assignedUser === assignedUserFilter);

    return (
        <div>
            <div className="task-filters">
                {/* Search input */}
                <input
                    type="text"
                    placeholder="Search by title or description"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* Status filter dropdown */}
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="To-Do">To-Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                {/* Assigned user filter dropdown */}
                <select
                    value={assignedUserFilter}
                    onChange={(e) => setAssignedUserFilter(e.target.value)}
                >
                    <option value="">All Users</option>
                    {/* Replace with dynamic user options */}
                    <option value="user1">User 1</option>
                    <option value="user2">User 2</option>
                </select>
            </div>
            {/* Task form */}
            <TaskForm
                onSubmit={handleCreateOrUpdateTask}
                initialData={editingTask}
                users={[]} // Replace with actual user data
            />
            {/* Task list */}
            <TaskList tasks={filteredTasks} onEdit={setEditingTask} onDelete={handleDeleteTask} />
        </div>
    );
};

export default Tasks;
