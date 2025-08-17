// --- Configuration ---
const API_BASE_URL = 'http://localhost:5000/api';

// --- API Helper ---
const api = {
  getToken: () => localStorage.getItem('token'),
  setToken: (token) => localStorage.setItem('token', token),
  removeToken: () => localStorage.removeItem('token'),

  _getAuthHeaders: () => ({
    'Content-Type': 'application/json',
    'x-auth-token': api.getToken(),
  }),

  login: (credentials) => fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  }).then(res => res.json()),

  register: (userData) => fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }).then(res => res.json()),

  getTasks: () => fetch(`${API_BASE_URL}/tasks`, { headers: api._getAuthHeaders() }).then(res => res.json()),
  createTask: (title) => fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: api._getAuthHeaders(),
    body: JSON.stringify({ title }),
  }).then(res => res.json()),
  deleteTask: (id) => fetch(`${API_BASE_URL}/tasks/${id}`, { method: 'DELETE', headers: api._getAuthHeaders() }),
  toggleTask: (id) => fetch(`${API_BASE_URL}/tasks/${id}`, { method: 'PUT', headers: api._getAuthHeaders() }),
};

module.exports = api;