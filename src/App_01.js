// src/App.js
import React from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [loginResponse, setLoginResponse] = React.useState(null);

  // WebODM credentials
  const WEBODM_URL = 'http://localhost:8000';
  const username = 'sidharth';  // Default WebODM username
  const password = 'Pass@123';  // Default WebODM password

  const login = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setLoginResponse(null);

      console.log('Attempting to login...'); // Debug log

      const response = await fetch(`${WEBODM_URL}/api/token-auth/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include' // Include cookies
      });
      
      const data = await response.json();
      console.log('Login response:', data); // Debug log
      setLoginResponse(data); // Store full response for debugging

      if (data.token) {
        localStorage.setItem('webodm_token', data.token);
        console.log('Login successful, fetching projects...'); // Debug log
        fetchProjects(data.token);
      } else {
        setError('Login failed: No token received');
      }
    } catch (err) {
      console.error('Login error:', err); // Debug log
      setError(`Login failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async (token) => {
    try {
      console.log('Fetching projects with token...'); // Debug log
      const response = await fetch(`${WEBODM_URL}/api/projects/`, {
        headers: {
          'Authorization': `JWT ${token}`,
        },
        credentials: 'include' // Include cookies
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Projects fetched:', data); // Debug log
      setProjects(data);
    } catch (err) {
      console.error('Project fetch error:', err); // Debug log
      setError(`Failed to fetch projects: ${err.message}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My WebODM Integration</h1>
        
        {error && (
          <div style={{ color: 'red', margin: '10px', padding: '10px', backgroundColor: '#ffebee' }}>
            {error}
          </div>
        )}

        {loginResponse && (
          <div style={{ margin: '10px', padding: '10px', backgroundColor: '#f5f5f5' }}>
            <pre>{JSON.stringify(loginResponse, null, 2)}</pre>
          </div>
        )}

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

        {projects.length > 0 && (
          <div style={{ margin: '20px' }}>
            <h2>Your Projects:</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {projects.map(project => (
                <li key={project.id} style={{ 
                  padding: '10px', 
                  margin: '5px 0',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px'
                }}>
                  {project.name} (ID: {project.id})
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;