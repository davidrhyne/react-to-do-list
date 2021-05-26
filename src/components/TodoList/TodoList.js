import React from 'react'
import './todoList.css'
import Todo from '../Todo/Todo'

export default function TodoList({ todos, toggleTodo }) {
    return (
        <div className="todo-list">
            {todos.map(todo => {
                return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            })}
        </div>

    )
}
