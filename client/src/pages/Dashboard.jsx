import React from 'react';
import TaskSummary from '../components/Dashboard/TaskSummary';
import ProjectsList from '../components/Dashboard/ProjectsList';

const Dashboard = () => (
    <div>
        <TaskSummary />
        <ProjectsList />
    </div>
);

export default Dashboard;
