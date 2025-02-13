import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/todos';

// Fetch all todos
export const fetchTodos = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

// Fetch a single todo by ID
export const fetchTodoById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Create a new todo
export const createTodo = async (task) => {
  const response = await axios.post(API_BASE_URL, { task });
  return response.data;
};

// Update a todo
export const updateTodo = async (id, updatedData) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};