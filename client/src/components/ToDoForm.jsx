import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { createTodo } from '../api/api';
import AddIcon from '@mui/icons-material/Add';

const ToDoForm = () => {
  const [newTask, setNewTask] = useState("")
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setTask("")
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      createMutation.mutate(newTask);
    }
  }

  return (
    <form className='w-full mb-5' onSubmit={handleSubmit}>
      <input 
        className='border p-2 w-1/2 rounded-lg'
        type='text'
        placeholder='Add a task'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className='ml-2 p-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-400' type='submit'>
        <AddIcon fontSize="medium"  />
      </button>
    </form>
  )
}

export default ToDoForm
