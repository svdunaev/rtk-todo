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

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {},
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

export default todoSlice.reducer;
