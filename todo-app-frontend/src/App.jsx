import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';


// Fungsi komponen App
function App() {
  // State untuk menyimpan data todo
  const [todos, setTodos] = useState([]);
  // State untuk menyimpan deskripsi todo yang akan ditambahkan
  const [description, setDescription] = useState('');
  // State untuk menandai apakah sedang loading atau tidak
  const [loading, setLoading] = useState(false);

  // Fungsi untuk mengambil data todo dari API
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fungsi untuk mengambil data todo dari API
  const fetchTodos = async () => {
    setLoading(true); // Menandai bahwa sedang loading
    try {
      const { data } = await axios.get('http://localhost:5000/todos');
      setTodos(data); // Menyimpan data todo ke state
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
    setLoading(false); // Menandai bahwa loading sudah selesai
  };

  // Fungsi untuk menambahkan todo baru
  const addTodo = async () => {
    if (description.trim() === '') return; // Jika deskripsi kosong, tidak melakukan apa-apa
    try {
      await axios.post('http://localhost:5000/todos', { description }); // Menambahkan todo baru ke API
      setDescription(''); // Menghapus deskripsi yang sudah ditambahkan
      fetchTodos(); // Mengambil data todo terbaru
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Fungsi untuk mengupdate todo
  const updateTodo = async (id, updatedTodo) => {
    try {
      await axios.put(`http://localhost:5000/todos/${id}`, updatedTodo); // Mengupdate todo di API
      fetchTodos(); // Mengambil data todo terbaru
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Fungsi untuk menghapus todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`); // Menghapus todo di API
      setTodos(todos.filter(todo => todo.id !== id)); // Menghapus todo dari state
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Daftar Tugas</h1>
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
        <p className="loading-text">Sedang loading...</p>
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

