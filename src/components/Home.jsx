import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const Button = styled(Link)`
  display: inline-block;
  margin: 10px;
  padding: 15px 30px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-size: 18px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Home = () => {
  return (
    <Container>
      <Title>Employee Management System</Title>
      <ButtonContainer>
        <Button to="/employees">View All Employees</Button>
        <Button to="/tasks">View All Tasks</Button>
      </ButtonContainer>
    </Container>
  );
};

export default Home;
