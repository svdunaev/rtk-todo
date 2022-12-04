import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'

export default function TodoList() {
  const todos = useSelector((state) => state.app.todos)

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  )
}
