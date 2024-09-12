import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

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

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
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
        <p>Loading...</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="todo-list">
                {todos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`todo-item ${todo.completed ? 'completed' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() =>
                            updateTodo(todo.id, { ...todo, completed: !todo.completed })
                          }
                          className="checkbox"
                        />
                        <span
                          className="todo-description"
                        >
                          {todo.description}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)} className="delete-button">
                          🗑
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

export default App;
