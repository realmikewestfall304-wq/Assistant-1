import React, { useState, useEffect } from 'react';
import { tasksAPI } from '../utils/api';
import TasksList from '../components/Tasks/TasksList';
import TaskForm from '../components/Tasks/TaskForm';
import './CommonPages.css';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const loadTasks = async () => {
    try {
      const filters = filter !== 'all' ? { status: filter } : {};
      const response = await tasksAPI.getAll(filters);
      setTasks(response.data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        await tasksAPI.update(editingTask.id, taskData);
      } else {
        await tasksAPI.create(taskData);
      }
      setShowForm(false);
      setEditingTask(null);
      loadTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.delete(id);
        loadTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-left">
          <h2>Task Management</h2>
          <div className="filter-tabs">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              All Tasks
            </button>
            <button 
              className={filter === 'pending' ? 'active' : ''} 
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={filter === 'completed' ? 'active' : ''} 
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>
        <button 
          className="btn-primary"
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
        >
          + New Task
        </button>
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

      <TasksList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onToggleComplete={(id, completed) => {
          handleSaveTask({ completed: completed ? 1 : 0 });
        }}
      />
    </div>
  );
};

export default TasksPage;
