import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../features/employees/employeesSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const ListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const ListItem = styled.li`
  border: 2px solid #007bff;
  border-radius: 8px;
  padding: 15px;
  width: 300px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
`;

const EmployeeLink = styled(Link)`
  font-size: 18px;
  font-weight: bold;
`;

const Button = styled(Link)`
  display: inline-block;
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const EmployeesList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  return (
    <Container>
      <Title>Employees</Title>
      <Button to="/employees/add">Add Employee</Button>
      <ListContainer>
        {employees.map(employee => (
          <ListItem key={employee.id}>
            <EmployeeLink to={`/employees/${employee.id}`}>
              {employee.firstname} {employee.lastname}
            </EmployeeLink>
            <p>Department: {employee.department}</p>
            <p>Tasks:</p>
            <ul>
              {employee.tasks?.map(task => (
                <li key={task.id}>{task.content} (Priority: {task.priority})</li>
              )) || <li>No tasks assigned</li>}
            </ul>
            <Button to={`/employees/edit/${employee.id}`}>Edit</Button>
            <button onClick={() => handleDelete(employee.id)}>Delete</button>
          </ListItem>
        ))}
      </ListContainer>
    </Container>
  );
};

export default EmployeesList;
