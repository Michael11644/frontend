import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchTasks } from '../features/tasks/tasksSlice';
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

const SingleTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.find(t => t.id === Number(id)));

  useEffect(() => {
    if (!task) {
      dispatch(fetchTasks());
    }
  }, [dispatch, task]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <BackButton to="/tasks">Back to Tasks</BackButton>
      <Title>{task.content}</Title>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.completed ? 'Completed' : 'In Progress'}</p>
      <p>Assigned to: {task.employee ? <Link to={`/employees/${task.employee.id}`}>{task.employee.firstname} {task.employee.lastname}</Link> : 'Unassigned'}</p>
    </Container>
  );
};

export default SingleTask;
