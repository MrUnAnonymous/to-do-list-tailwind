const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

let todos = [
  { id: 1, task: 'Go for a walk', completed: false },
  { id: 2, task: 'Get 8 hours sleep', completed: false },
];

let nextId = 3;
const generateId = () => nextId++;

// GET /todos - Fetch all todos
app.get('/todos', (req, res) => {
  try {
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST /todos - Create a new todo
app.post('/todos', (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ error: 'Task is required' });
    }

    const newTodo = {
      id: generateId(),
      task,
      completed: false,
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT /todos/:id - Update a todo (task and/or completion status)
app.put('/todos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { task, completed } = req.body;

    const todoIndex = todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Update the task if provided
    if (task !== undefined) {
      todos[todoIndex].task = task;
    }

    // Update the completion status if provided
    if (completed !== undefined) {
      todos[todoIndex].completed = completed;
    }

    res.status(200).json(todos[todoIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE /todos/:id - Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todos = todos.filter((t) => t.id !== id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});