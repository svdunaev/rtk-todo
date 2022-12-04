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

    const data = await response.json();
		return data;
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const deleteTodo = createAsyncThunk(
	'todos/deleteTodo',
	async function (id, { rejectWithValue, dispatch }) {
		try {
			const response = await fetch(`https://637acf47702b9830b9f3792a.mockapi.io/todos/${id}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				throw new Error('Can\'t delete task. Server error!')
			}
		
			dispatch(removeTodo({id}))

		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
		removeTodo(state, action) {
			state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
		}
	},
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.todos = action.payload
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  },
})

const {removeTodo} = todoSlice.actions;

export default todoSlice.reducer;
