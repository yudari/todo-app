import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Function to reorder the list
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function App() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/todos');
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
    setLoading(false);
  };

  const addTodo = async () => {
    if (description.trim() === '') return;
    try {
      await axios.post('http://localhost:5000/todos', { description });
      setDescription('');
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      await axios.put(`http://localhost:5000/todos/${id}`, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tambah tugas baru"
          className="input-field"
        />
        <button onClick={addTodo} className="add-button">+</button>
      </div>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="todo-container">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  updateTodo(todo.id, { ...todo, completed: !todo.completed })
                }
                className="checkbox"
              />
              <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                className="todo-description"
              >
                {todo.description}
              </span>
              <button onClick={() => deleteTodo(todo.id)} className="delete-button">
                🗑
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
