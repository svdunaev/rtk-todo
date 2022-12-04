import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewTodo } from '../store/todoSlice'

export default function AddTodoForm() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleAction = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text))
      setText('')
    }
  }

  return (
    <label>
      <input
        value={text}
        placeholder="new todo"
        onChange={(evt) => setText(evt.target.value)}
      />
      <button onClick={handleAction}> add todo </button>
    </label>
  )
}
