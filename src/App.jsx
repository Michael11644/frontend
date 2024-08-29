import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeesList from './components/EmployeesList';
import SingleEmployee from './components/SingleEmployee';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import TasksList from './components/TasksList';
import SingleTask from './components/SingleTask';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import Home from './components/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<EmployeesList />} />
      <Route path="/employees/add" element={<AddEmployee />} />
      <Route path="/employees/edit/:id" element={<EditEmployee />} />
      <Route path="/employees/:id" element={<SingleEmployee />} />
      <Route path="/tasks" element={<TasksList />} />
      <Route path="/tasks/add" element={<AddTask />} />
      <Route path="/tasks/edit/:id" element={<EditTask />} />
      <Route path="/tasks/:id" element={<SingleTask />} />
    </Routes>
  );
}

export default App;

