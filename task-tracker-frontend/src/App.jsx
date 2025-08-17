import { useState } from 'react';
import AuthPage from './components/AuthPage';
import TaskTracker from './components/TaskTracker';
import api from '../services/api';
import './App.css';

function App() {
  const [authToken, setAuthToken] = useState(api.getToken());

  return authToken ? 
      <TaskTracker setAuthToken={setAuthToken} /> : 
      <AuthPage setAuthToken={setAuthToken} />;
}

export default App