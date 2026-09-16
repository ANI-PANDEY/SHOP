import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  if (tasks.length === 0) {
    return (
      <div className="glass" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        No tasks found. Create one above!
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onTaskUpdated={onTaskUpdated}
          onTaskDeleted={onTaskDeleted}
        />
      ))}
    </div>
  );
};

export default TaskList;
