// src/App.js
import React from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = React.useState([]);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [tasks, setTasks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const WEBODM_URL = 'http://localhost:8000';
  const username = 'sidharth';
  const password = 'Pass@123';

  // Function to handle file uploads
  const handleFileUpload = async (projectId, files) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('webodm_token');
      
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('images', file);
      });

      const response = await fetch(`${WEBODM_URL}/api/projects/${projectId}/tasks/`, {
        method: 'POST',
        headers: {
          'Authorization': `JWT ${token}`,
        },
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');
      
      // Refresh tasks after upload
      fetchTasks(projectId);
    } catch (err) {
      setError(`Upload failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch tasks for a project
  const fetchTasks = async (projectId) => {
    try {
      const token = localStorage.getItem('webodm_token');
      const response = await fetch(`${WEBODM_URL}/api/projects/${projectId}/tasks/`, {
        headers: {
          'Authorization': `JWT ${token}`,
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch tasks');
      
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(`Failed to fetch tasks: ${err.message}`);
    }
  };

  // Initial login and project fetch
  const login = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${WEBODM_URL}/api/token-auth/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('webodm_token', data.token);
        fetchProjects(data.token);
      } else {
        setError('Login failed: No token received');
      }
    } catch (err) {
      setError(`Login failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async (token) => {
    try {
      const response = await fetch(`${WEBODM_URL}/api/projects/`, {
        headers: {
          'Authorization': `JWT ${token}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(`Failed to fetch projects: ${err.message}`);
    }
  };

  // Handle project selection
  const handleProjectClick = async (project) => {
    setSelectedProject(project);
    await fetchTasks(project.id);
  };

  return (
    <div className="App" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>WebODM Project Manager</h1>
      
      {error && (
        <div style={{ color: 'red', margin: '10px', padding: '10px', backgroundColor: '#ffebee' }}>
          {error}
        </div>
      )}

      {!localStorage.getItem('webodm_token') && (
        <button 
          onClick={login}
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            margin: '10px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {isLoading ? 'Connecting...' : 'Connect to WebODM'}
        </button>
      )}

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {/* Projects List */}
        <div style={{ flex: '1' }}>
          <h2>Your Projects</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {projects.map(project => (
              <div 
                key={project.id}
                onClick={() => handleProjectClick(project)}
                style={{
                  padding: '10px',
                  backgroundColor: selectedProject?.id === project.id ? '#e3f2fd' : '#f5f5f5',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {project.name} (ID: {project.id})
              </div>
            ))}
          </div>
        </div>

        {/* Project Details */}
        {selectedProject && (
          <div style={{ flex: '2' }}>
            <h2>{selectedProject.name} Details</h2>
            
            {/* File Upload */}
            <div style={{ marginBottom: '20px' }}>
              <h3>Upload Images</h3>
              <input 
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileUpload(selectedProject.id, e.target.files)}
                style={{ marginBottom: '10px' }}
              />
            </div>

            {/* Tasks List */}
            <div>
              <h3>Tasks</h3>
              {tasks.length === 0 ? (
                <p>No tasks yet</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tasks.map(task => (
                    <div 
                      key={task.id}
                      style={{
                        padding: '10px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '4px'
                      }}
                    >
                      <div>Task ID: {task.id}</div>
                      <div>Status: {task.status}</div>
                      <div>Created: {new Date(task.created_at).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;