import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('/api/tasks');
  return response.data;
});

// Async thunk for adding a new task
export const addTask = createAsyncThunk('tasks/addTask', async (newTask) => {
  const response = await axios.post('/api/tasks', newTask);
  return response.data;
});

// Async thunk for updating a task
export const updateTask = createAsyncThunk('tasks/updateTask', async (updatedTask) => {
  const response = await axios.put(`/api/tasks/${updatedTask.id}`, updatedTask);
  return response.data;
});

// Async thunk for deleting a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await axios.delete(`/api/tasks/${taskId}`);
  return taskId;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => action.payload)
      .addCase(addTask.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        return state.filter(task => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
