import React, { useState } from 'react';
import '../../styles/TaskForm.css';

const TaskForm = ({ onSubmit, initialData = {}, users }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [status, setStatus] = useState(initialData?.status || 'To-Do');
    const [deadline, setDeadline] = useState(initialData?.deadline || '');
    const [assignedUser, setAssignedUser] = useState(initialData?.assignedUser || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, status, deadline, assignedUser });
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h2>{initialData?.title ? 'Edit Task' : 'Create Task'}</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
            />
            <select
                value={assignedUser}
                onChange={(e) => setAssignedUser(e.target.value)}
                required
            >
                <option value="">Assign to User</option>
                {users.map((user) => (
                    <option key={user._id} value={user._id}>
                        {user.name}
                    </option>
                ))}
            </select>
            <button type="submit">Submit</button>
        </form>
    );
};

export default TaskForm;
