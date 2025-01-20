import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // Track the current wizard step
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const WEBODM_URL = 'http://localhost:8000';

  useEffect(() => {
    const token = localStorage.getItem('webodm_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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
        setIsLoggedIn(true);
      } else {
        setError('Login failed: No token received');
      }
    } catch (err) {
      setError(`Login failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('webodm_token');
    setIsLoggedIn(false);
    setCurrentStep(1); // Reset wizard to the first step
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 2)); // Only 2 steps now
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <iframe
              src={`${WEBODM_URL}/dashboard/`}
              className="webodm-iframe"
              title="WebODM Interface"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <iframe
              src="/page2.html"
              className="page2-iframe"
              title="View & Draw Tools"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div className="login-container">
          <div className="login-card">
            <h1 className="small-header">GeoPoly Mapper</h1>
            {error && <div className="error-message">{error}</div>}
            <div className="login-inputs">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>
            <button onClick={login} disabled={isLoading} className="login-button">
              {isLoading ? 'Connecting...' : 'Connect to WebODM'}
            </button>
          </div>
        </div>
      ) : (
        <div className="webodm-dashboard">
          <header className="dashboard-header">
            <h2 className="small-header"> GeoPoly Mapper</h2>
            <div className="logout-container">
              <button onClick={logout} className="logout-button">Logout</button>
            </div>
          </header>
          <div className="wizard-container">
            <div className="wizard-steps">
              {renderStepContent()}
            </div>
          </div>
          <div className="wizard-navigation">
            <h3 className="small-header">
              {currentStep === 1 ? 'Step 1: Process Images (WebODM)' : 'Step 2: View & Draw'}
            </h3>
            <div>
              <button onClick={prevStep} disabled={currentStep === 1} className="nav-button">
                Previous
              </button>
              <button onClick={nextStep} disabled={currentStep === 2} className="nav-button">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
