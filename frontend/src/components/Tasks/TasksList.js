import React from 'react';
import './TasksList.css';

const TasksList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📝</div>
        <div className="empty-state-text">No tasks yet</div>
        <div className="empty-state-subtext">Create your first task to get started</div>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: '#e74c3c',
      high: '#f39c12',
      medium: '#3498db',
      low: '#95a5a6'
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className="tasks-list">
      {tasks.map((task) => (
        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <div className="task-checkbox">
            <input
              type="checkbox"
              checked={task.completed === 1}
              onChange={(e) => onToggleComplete(task.id, e.target.checked)}
            />
          </div>
          <div className="task-content">
            <div className="task-header">
              <h3 className="task-title">{task.title}</h3>
              <span 
                className="task-priority"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
              >
                {task.priority}
              </span>
            </div>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <div className="task-meta">
              <span className="task-category">{task.category}</span>
              {task.due_date && (
                <span className="task-due-date">Due: {new Date(task.due_date).toLocaleDateString()}</span>
              )}
            </div>
          </div>
          <div className="task-actions">
            <button 
              className="btn-edit"
              onClick={() => onEdit(task)}
            >
              Edit
            </button>
            <button 
              className="btn-delete"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
