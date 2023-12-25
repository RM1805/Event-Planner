// Login.js
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
  max-width: 450px; /* Set to the same size as LoginContainer */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50; /* Dark Grayish Blue */
  padding: 15px;
  border-radius: 2px;
  margin-bottom: 1px; /* Add margin between Navbar and LoginContainer */
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

const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 10px 10px;
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
  background: #3498db; /* Dodger Blue */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #2980b9; /* Darker Dodger Blue */
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/events");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <AppContainer>
      <Navbar>
        <Logo>Event Planner</Logo>
        <NavigationLinks>
          <Link to="/">Home</Link>
          <Link to="/register">SignUp</Link>
        </NavigationLinks>
      </Navbar>
      <LoginContainer>
        <Title>Login</Title>
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
        <Button onClick={handleLogin}>Login</Button>
      </LoginContainer>
    </AppContainer>
  );
};

export default Login;
