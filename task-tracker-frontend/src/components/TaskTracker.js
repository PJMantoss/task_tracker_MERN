import { useState, useEffect } from 'react';

export default function TaskTracker({ setAuthToken }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await api.getTasks();
      if(Array.isArray(fetchedTasks)) {
        setTasks(fetchedTasks);
      } else {
        setError("Failed to fetch tasks. Please log in again.");
        handleLogout();
      }
    } catch (err) {
      setError('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      const newTask = await api.createTask(newTaskTitle);
      setTasks([newTask, ...tasks]);
      setNewTaskTitle('');
    } catch (err) {
      setError('Failed to add task.');
    }
  };
  
  const handleToggleTask = async (id) => {
    try {
      await api.toggleTask(id);
      setTasks(tasks.map(task => task._id === id ? { ...task, completed: !task.completed } : task));
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  const handleLogout = () => {
    api.removeToken();
    setAuthToken(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">My Tasks</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </header>

        <main className="bg-gray-50 p-6 rounded-xl shadow-lg">
          <form onSubmit={handleAddTask} className="mt-6 mb-8">
            <div className="flex">
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-l-lg"
                placeholder="Add a new task..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <button type="submit" className="bg-blue-600 text-white px-6 rounded-r-lg">Add</button>
            </div>
          </form>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          
          <div>
            {tasks.map(task => (
              <div key={task._id} className={`flex items-center justify-between p-4 my-2 rounded-lg ${task.completed ? 'bg-green-100' : 'bg-white'}`}>
                <span onClick={() => handleToggleTask(task._id)} className={`cursor-pointer ${task.completed ? 'line-through' : ''}`}>
                  {task.title}
                </span>
                <button onClick={() => handleDeleteTask(task._id)} className="bg-red-500 text-white w-8 h-8 rounded-full">&#x2715;</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}