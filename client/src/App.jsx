import { useState } from 'react'
import './App.css'
import ToDoList from "./components/ToDoList"
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <ToDoList />
    </>
  )
}

export default App
