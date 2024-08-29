import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchEmployees } from '../features/employees/employeesSlice';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
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

const SingleEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.find(e => e.id === Number(id)));

  useEffect(() => {
    if (!employee) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employee]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <BackButton to="/employees">Back to Employees</BackButton>
      <Title>{employee.firstname} {employee.lastname}</Title>
      <p>Department: {employee.department}</p>
      <p>Tasks:</p>
      <ul>
        {employee.tasks.map(task => (
          <li key={task.id}>
            {task.content} (Priority: {task.priority}) - <Link to={`/tasks/${task.id}`}>View Task</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default SingleEmployee;
