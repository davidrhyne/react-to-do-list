import React, { useState, useRef, useEffect } from 'react'
import TodoList from './components/TodoList/TodoList'
import './App.css'; 
import { v4 as uuidv4 } from 'uuid';

function App() {
  // create state for the application
  const [ todos, setTodos ] = useState([])
  const todoNameRef = useRef();
  const LOCAL_STORAGE_KEY = 'todosApp.todos'

  // load any existing to dos from local storage on load
  useEffect(() => {
    const storedTodos = JSON.parse( localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  },[])

  // save any changes to to do's to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])

  // toggle isCompleted on given to do
  function toggleTodo(id) {
    // get copy of existing to dos
    const currentTodos = [...todos]
    // find the to do to update
    const todo = currentTodos.find(todo => todo.id === id)
    // change value of isComplete to opposite
    todo.isCompleted = !todo.isCompleted
    // overwrite existing to dos with updated copy
    setTodos(currentTodos)
  }

  // add new to do to list
  function handleAddTodo(e) {
    // get value from input field
    const newTodo = todoNameRef.current.value
    // if field is empty, then exit function
    if (newTodo === '') return 
    
    // add new record to array, after existing to dos, uuidv4 is unique id
    setTodos(prevTodos => {
      return [...prevTodos, {id:uuidv4(), name: newTodo, isCompleted: false}]
    })

    // clear to do input after adding 
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const currentTodos = todos.filter(todo => !todo.isCompleted)
    setTodos(currentTodos)
  }

  return (
    <div className="container">
      <h3>The Official To Do List</h3>      
      
      <input ref={todoNameRef} type="text" placeholder="add new item to do item here"/>
      <button className="clear" onClick={handleClearTodos}>Clear Complete To Do's</button>
      <button className="add" onClick={handleAddTodo}>Add New To Do</button>      
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <div className="unfinished">{todos.filter(todo => !todo.isCompleted).length} unfinished to do's</div>
    </div>
  )
}

export default App;