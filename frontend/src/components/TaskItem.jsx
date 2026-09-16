import React from 'react';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        onTaskUpdated(updatedTask);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onTaskDeleted(task.id);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case 'todo': return 'badge-todo';
      case 'in-progress': return 'badge-in-progress';
      case 'done': return 'badge-done';
      default: return 'badge-todo';
    }
  };

  return (
    <div className="task-item glass animate-slide-in">
      <div className="task-content">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <span className={`task-badge ${getBadgeClass(task.status)}`}>
          {task.status.replace('-', ' ')}
        </span>
      </div>
      <div className="task-actions">
        {task.status !== 'todo' && (
          <button onClick={() => handleStatusChange('todo')} className="btn-success">
            To Do
          </button>
        )}
        {task.status !== 'in-progress' && (
          <button onClick={() => handleStatusChange('in-progress')} className="btn-primary">
            Start
          </button>
        )}
        {task.status !== 'done' && (
          <button onClick={() => handleStatusChange('done')} className="btn-success">
            Done
          </button>
        )}
        <button onClick={handleDelete} className="btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
