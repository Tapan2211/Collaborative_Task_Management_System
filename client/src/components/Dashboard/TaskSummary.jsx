import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTasks } from '../../api/task'; // Assuming you have a function to fetch tasks for a specific project
import TaskList from '../Task/TaskList'; // Assuming TaskList is the component that lists all tasks
import '../../styles/TaskSummary.css';

function TaskSummary() {
    const { projectId } = useParams();
    console.log('Project ID 000:', projectId);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {

                const fetchedTasks = await getTasks(projectId);
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Failed to fetch tasks:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [projectId]);


    if (loading) {
        return <p>Loading tasks...</p>;
    }

    return (
        <div className="task-summary">
            <h2>Tasks for Project {projectId}</h2>
            {tasks.length === 0 ? (
                <p>No tasks available for this project.</p>
            ) : (
                <TaskList tasks={tasks} />
            )}
        </div>
    );
}

export default TaskSummary;
