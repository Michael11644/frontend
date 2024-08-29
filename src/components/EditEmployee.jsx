import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee } from '../features/employees/employeesSlice';
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

const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employee = useSelector((state) => state.employees.find(e => e.id === Number(id)));

  const [firstname, setFirstname] = useState(employee?.firstname || '');
  const [lastname, setLastname] = useState(employee?.lastname || '');
  const [department, setDepartment] = useState(employee?.department || '');

  useEffect(() => {
    if (employee) {
      setFirstname(employee.firstname);
      setLastname(employee.lastname);
      setDepartment(employee.department);
    }
  }, [employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateEmployee({ id: Number(id), firstname, lastname, department })).unwrap();
      navigate('/employees');
    } catch (err) {
      console.error('Failed to update employee: ', err);
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>Edit Employee</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <Button type="submit">Save Changes</Button>
      </Form>
    </Container>
  );
};

export default EditEmployee;
