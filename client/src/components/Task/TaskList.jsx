import React from 'react';
import '../../styles/TaskList.css';
const TaskList = ({ tasks, onEdit, onDelete }) => {
    const groupedTasks = tasks.reduce((acc, task) => {
        acc[task.status] = acc[task.status] || [];
        acc[task.status].push(task);
        return acc;
    }, {});

    return (
        <div className="task-list">
            {Object.keys(groupedTasks).map((status) => (
                <div key={status} className="task-group">
                    <h3>{status}</h3>
                    {groupedTasks[status].map((task) => (
                        <div key={task._id} className="task-card">
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                            <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                            <div className="task-card-actions">
                                <button onClick={() => onEdit(task)}>Edit</button>
                                <button onClick={() => onDelete(task._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TaskList;


// const TaskList = ({ tasks, onEdit, onDelete }) => {
//     return (
//         <div className="task-list">
//             {tasks.map((task) => (
//                 <div key={task._id} className="task-card">
//                     <h3>{task.title}</h3>
//                     <p>{task.description}</p>
//                     <p>Status: {task.status}</p>
//                     <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
//                     <div className="task-card-actions">
//                         <button onClick={() => onEdit(task)}>Edit</button>
//                         <button onClick={() => onDelete(task._id)}>Delete</button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };


