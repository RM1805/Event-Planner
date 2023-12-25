// Register.js
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(45deg, #2980b9, #6ab0de); /* Gradient Blue */
`;

const Navbar = styled.nav`
  width: 100%;
  max-width: 450px; /* Set to the same size as RegisterContainer */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50; /* Dark Grayish Blue */
  padding: 15px;
  border-radius: 10px 10px 0 0; /* Border radius applied only to the top corners */
  margin-bottom: 1px; /* Add margin between Navbar and RegisterContainer */
`;

const Logo = styled.h1`
  color: #ecf0f1; /* Light Grayish Blue */
  margin: 0;
  font-size: 24px;
`;

const NavigationLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: #ecf0f1; /* Light Grayish Blue */
    text-decoration: none;
    font-size: 18px;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #34495e; /* Darker Grayish Blue */
    }
  }
`;

const RegisterContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 10px 10px; /* Border radius applied only to the bottom corners */
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background: #28a745; /* Green */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #218838; /* Darker Green */
  }
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(
        "https://event-planner-backend-ctos.onrender.com/register",
        {
          username,
          password,
        }
      );

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <AppContainer>
      <Navbar>
        <Logo>Event Planner</Logo>
        <NavigationLinks>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </NavigationLinks>
      </Navbar>
      <RegisterContainer>
        <Title>Register</Title>
        <Input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>Register</Button>
      </RegisterContainer>
    </AppContainer>
  );
};

export default Register;
