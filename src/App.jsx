import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import reactLogo from './assets/react.svg'
import './App.css'
import { fetchTodos } from './store/todoSlice'
import TodoList from './components/TodoList'

function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <div className="App">
      <TodoList />
    </div>
  )
}

export default App
