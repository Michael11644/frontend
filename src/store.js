import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './features/employees/employeesSlice';
import tasksReducer from './features/tasks/tasksSlice';

const store = configureStore({
  reducer: {
    employees: employeesReducer,
    tasks: tasksReducer,
  },
});

export default store;
