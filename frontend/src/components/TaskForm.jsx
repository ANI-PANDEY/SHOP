import { useState } from 'react';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        const newTask = await response.json();
        onTaskAdded(newTask);
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="task-form-container glass animate-slide-in">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
        <button type="submit" className="btn-primary">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
