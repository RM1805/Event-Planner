// Login.js
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(45deg, #2980b9, #6ab0de);
`;

const Navbar = styled.nav`
  width: 100%;
  max-width: 410px; /* Set to the same size as RegisterContainer */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #34495e;
  padding: 15px;
  border-radius: 10px 10px 0 0;
  margin-bottom: 1px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  color: #ecf0f1;
  margin: 0;
  font-size: 24px;
`;

const NavigationLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: #ecf0f1;
    text-decoration: none;
    font-size: 18px;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #2c3e50;
    }
  }
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 10px 10px;
  text-align: center;
`;

const Title = styled.h2`
  color: #3498db;
  font-size: 28px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: calc(100% - 30px);
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: calc(100% - 30px);
  padding: 15px;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #2980b9;
  }
`;

const Loader = styled(CircularProgress)`
  color: #3498db;
  margin: 20px auto;
`;

const StyledLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  font-size: 16px;
  margin-top: 20px;
  display: block;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #2980b9;
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); // Set loading to true on login initiation
    try {
      const response = await axios.post(
        "https://event-planner-backend-ctos.onrender.com/login",
        {
          username,
          password,
        }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/events");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false); // Reset loading to false after login attempt
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
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? <Loader size={24} sx={{ color: "white" }} /> : "Login"}
        </Button>
        <StyledLink to="/register">
          Do not have an account? SignUp here.
        </StyledLink>
      </LoginContainer>
    </AppContainer>
  );
};

export default Login;
