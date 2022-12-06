import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { fetchTodos } from './store/todoSlice'
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'

function App() {
  const dispatch = useDispatch()
  const {status, error} = useSelector(state => state.app)


  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <div className="App">

      {status === 'loading' && <h2>loading</h2>}
      {error && <h2>Error occured: {error}</h2>}

      <AddTodoForm />

      <TodoList />
    </div>
  )
}

export default App
