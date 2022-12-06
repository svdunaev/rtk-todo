import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async function (
  _,
  { rejectWithValue },
) {
  try {
    const response = await fetch(
      'https://637acf47702b9830b9f3792a.mockapi.io/todos',
    )

    if (!response.ok) {
      throw new Error('Server Error!')
    }

    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async function (
  id,
  { rejectWithValue, dispatch },
) {
  try {
    const response = await fetch(
      `https://637acf47702b9830b9f3792a.mockapi.io/todos/${id}`,
      {
        method: 'DELETE',
      },
    )

    if (!response.ok) {
      throw new Error("Can't delete task. Server error!")
    }

    dispatch(removeTodo({ id }))
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const toggleStatus = createAsyncThunk(
  'todos/toggleStatus',
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().app.todos.find((todo) => todo.id === id)

    try {
      const response = await fetch(
        `https://637acf47702b9830b9f3792a.mockapi.io/todos/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        },
      )

      if (!response.ok) {
        throw new Error("Can't toggle status. Server error!")
      }

      dispatch(toggleComplete({ id }))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async function (
  text,
  { rejectWithValue, dispatch },
) {
  try {
    const todo = {
      text: text,
      completed: false,
    }

    const response = await fetch(
      'https://637acf47702b9830b9f3792a.mockapi.io/todos',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      },
    )

    if (!response.ok) {
      throw new Error("Can't add task. Server error!")
    }

    const data = await response.json()
    dispatch(addTodo(data))
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const setError = (state, action) => {
  state.status = 'rejected'
  state.error = action.payload
}

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
    },
    toggleComplete(state, action) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload.id,
      )
      toggledTodo.completed = !toggledTodo.completed
    },
    addTodo(state, action) {
      state.todos.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.todos = action.payload
    })
    builder.addCase(fetchTodos.rejected, setError)
    builder.addCase(deleteTodo.rejected, setError)
    builder.addCase(toggleStatus.rejected, setError)
  }
})

const { removeTodo, toggleComplete, addTodo } = todoSlice.actions

export default todoSlice.reducer
