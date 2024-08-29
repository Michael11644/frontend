import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching employees
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get('/api/employees');
  return response.data;
});

// Async thunk for adding a new employee
export const addEmployee = createAsyncThunk('employees/addEmployee', async (newEmployee) => {
  const response = await axios.post('/api/employees', newEmployee);
  return response.data;
});

// Async thunk for updating an employee
export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (updatedEmployee) => {
  const response = await axios.put(`/api/employees/${updatedEmployee.id}`, updatedEmployee);
  return response.data;
});

// Async thunk for deleting an employee
export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (employeeId) => {
  await axios.delete(`/api/employees/${employeeId}`);
  return employeeId;
});

const employeesSlice = createSlice({
  name: 'employees',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action) => action.payload)
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.findIndex(employee => employee.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        return state.filter(employee => employee.id !== action.payload);
      });
  },
});

export default employeesSlice.reducer;
