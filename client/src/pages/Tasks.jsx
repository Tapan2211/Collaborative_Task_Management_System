import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskList from '../components/Task/TaskList';
import TaskForm from '../components/Task/TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from '../api/task';

const Tasks = () => {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, [projectId]);

    const fetchTasks = async () => {
        const data = await getTasks(projectId);
        setTasks(data);
    };

    const handleCreateOrUpdateTask = async (taskData) => {
        if (editingTask) {
            await updateTask(editingTask._id, taskData);
        } else {
            await createTask({ ...taskData, projectId });
        }
        setEditingTask(null);
        fetchTasks();
    };

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
        fetchTasks();
    };

    return (
        <div>
            <TaskForm
                onSubmit={handleCreateOrUpdateTask}
                initialData={editingTask}
                users={[]} // Replace with actual user data
            />
            <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDeleteTask} />
        </div>
    );
};

export default Tasks;
