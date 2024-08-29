import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../features/tasks/tasksSlice';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  margin: 10px;
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const EditTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector((state) => state.tasks.find(t => t.id === Number(id)));

  const [content, setContent] = useState(task?.content || '');
  const [priority, setPriority] = useState(task?.priority || 1);
  const [completed, setCompleted] = useState(task?.completed || false);

  useEffect(() => {
    if (task) {
      setContent(task.content);
      setPriority(task.priority);
      setCompleted(task.completed);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id: Number(id), content, priority, completed }));
    navigate('/tasks');
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>Edit Task</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Task Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
        >
          <option value={1}>1 (High)</option>
          <option value={2}>2 (Medium)</option>
          <option value={3}>3 (Low)</option>
        </Select>
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>
        <Button type="submit">Save Changes</Button>
      </Form>
    </Container>
  );
};

export default EditTask;
