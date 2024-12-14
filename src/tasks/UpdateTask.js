import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTask = () => {
  const { id } = useParams(); // Get task ID from URL
  const navigate = useNavigate();

  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch the existing task details
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/tasks/${id}`);
        const data = await response.json();

        if (response.ok) {
          setTask(data.task);
          setDescription(data.description);
          setCategory(data.category || '');
          setDeadline(data.deadline || '');
        } else {
          setErrorMessage(data.error);
        }
      } catch (error) {
        setErrorMessage('Failed to fetch task details. Please try again.');
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!task || !description) {
      setErrorMessage('Task and Description are required!');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task,
          description,
          category,
          deadline,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Task updated successfully!');
        setErrorMessage('');
        setTimeout(() => navigate('/tasks'), 2000); // Redirect to task list after success
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating the task. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Update Task</h2>

      {/* Error Message */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Success Message */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Task</label>
          <input
            type="text"
            className="form-control"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task name"
          />
        </div>
        <div className="form-group mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter task category (optional)"
          />
        </div>
        <div className="form-group mb-3">
          <label>Deadline</label>
          <input
            type="date"
            className="form-control"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
