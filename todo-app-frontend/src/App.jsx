import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

// Fungsi komponen App
function App() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/todos');
      setTodos(data);
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengambil daftar tugas: ",
        error.message
      );
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
      console.error("Terjadi kesalahan saat menambah tugas: ", error.message);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      await axios.put(`http://localhost:5000/todos/${id}`, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat memperbarui tugas: ",
        error.message
      );
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat menghapus tugas: ",
        error.message
      );
    }
  };

  const startEdit = (todo) => {
    setEditTodo(todo);
    setEditDescription(todo.description);
  };

  const saveEdit = async () => {
    if (editDescription.trim() === '') return;
    try {
      await updateTodo(editTodo.id, { ...editTodo, description: editDescription });
      setEditTodo(null);
      setEditDescription('');
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat menyimpan perubahan: ",
        error.message
      );
    }
  };

  const cancelEdit = () => {
    setEditTodo(null);
    setEditDescription('');
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
              {editTodo && editTodo.id === todo.id ? (
                <div className="edit-container">
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="edit-field"
                  />
                  <button onClick={saveEdit} className="save-button">Simpan</button>
                  <button onClick={cancelEdit} className="cancel-button">Batal</button>
                </div>
              ) : (
                <>
                  <span
                    className="todo-description"
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                  >
                    {todo.description}
                  </span>
                  <div className="todo-actions">
                    <button onClick={() => startEdit(todo)} className="edit-button">
                      ✏️
                    </button>
                    <button onClick={() => deleteTodo(todo.id)} className="delete-button">
                      🗑
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

