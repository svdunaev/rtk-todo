import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { fetchTodos } from './store/todoSlice'
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <div className="App">
      <AddTodoForm />

      <TodoList />
    </div>
  )
}

export default App
