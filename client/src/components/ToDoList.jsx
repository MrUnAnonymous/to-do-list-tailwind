import React, { useState } from "react";
import { deleteTodo, fetchTodos, updateTodo } from "../api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ToDoForm from "./ToDoForm";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import moment from 'moment';

const ToDoList = () => {
  const queryClient = useQueryClient(); 
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const today = moment().format('MMMM Do YYYY');

  const hour = new Date().getHours();
  let greeting = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedData }) => updateTodo(id, updatedData), // Corrected mutationFn
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setEditingId(null); // Reset editing state
      setNewTitle(""); // Clear the input
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const handleToggleComplete = (id, completed) => {
    updateMutation.mutate({ id, updatedData: { completed: !completed } });
  };

  const handleUpdateTask = (id) => {
    if (newTitle.trim()) {
      updateMutation.mutate({ id, updatedData: { task: newTitle } });
    setEditingId(null); // Reset editing state
      setNewTitle(""); // Clear the input
    }
  };

  const handleDeleteTodo = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading....</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="md:ml-55 p-5 flex flex-col items-center md:items-start">
      <h1 className="text-2xl text-gray-500 font-bold mb-3 md:text-left text-center">
        {greeting} User
      </h1>
      <h1 className="text-xl text-gray-500 font-semibold mb-5 md:text-left text-center">
        It's {today}
      </h1>
      <ToDoForm />

      <div className="w-full">
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-3 rounded-lg drop-shadow-lg bg-white"
            >
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id, todo.completed)}
                  className="mr-3 w-5 h-5"
                />
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="p-2 border border-gray-400 rounded"
                  />
                ) : (
                  <span
                    className={`${
                      todo.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.task}
                  </span>
                )}
              </div>

              <div>
                {editingId === todo.id ? (
                  <button
                    className="cursor-pointer mr-2"
                    onClick={() => handleUpdateTask(todo.id)}
                  >
                    <SaveIcon />
                  </button>
                ) : (
                  <button
                    className="cursor-pointer mr-2"
                    onClick={() => {
                      setEditingId(todo.id);
                      setNewTitle(todo.task);
                    }}
                  >
                    <EditIcon />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="p-2 rounded-full cursor-pointer"
                >
                  <DeleteForeverIcon />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;