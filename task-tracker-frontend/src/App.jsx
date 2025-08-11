import { useState } from 'react'
import './App.css'

function App() {
  const [authToken, setAuthToken] = useState(api.getToken());

  return authToken ? 
      <TaskTracker setAuthToken={setAuthToken} /> : 
      <AuthPage setAuthToken={setAuthToken} />;
}

export default App
