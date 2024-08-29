import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../features/tasks/tasksSlice';
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

const TaskLink = styled(Link)`
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

const TasksList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <Container>
      <Title>Tasks</Title>
      <Button to="/tasks/add">Add Task</Button>
      <ListContainer>
        {tasks.map(task => (
          <ListItem key={task.id}>
            <TaskLink to={`/tasks/${task.id}`}>
              {task.content}
            </TaskLink>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.completed ? 'Completed' : 'In Progress'}</p>
            <p>Assigned to: {task.employee ? task.employee.firstname + ' ' + task.employee.lastname : 'Unassigned'}</p>
            <Button to={`/tasks/edit/${task.id}`}>Edit</Button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </ListItem>
        ))}
      </ListContainer>
    </Container>
  );
};

export default TasksList;
