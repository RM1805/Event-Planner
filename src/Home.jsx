// Home.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 40px;
  background-color: #3498db; /* Dodger Blue */
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2c3e50;
  padding: 15px;
  border-radius: 10px 10px 0 0;
`;

const Logo = styled.h1`
  color: #ecf0f1;
  margin: 0;
  font-size: 24px;
`;

const NavigationLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    color: #ecf0f1;
    text-decoration: none;
    font-size: 18px;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #34495e;
    }
  }
`;

const Title = styled.h1`
  color: #ecf0f1; /* Light Grayish Blue */
  font-size: 48px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: #ecf0f1; /* Light Grayish Blue */
  font-size: 20px;
  margin-bottom: 40px;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  li {
    margin: 20px;
    text-align: center;
    background-color: #2c3e50; /* Dark Grayish Blue */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #34495e; /* Darker Grayish Blue */
    }

    h3 {
      color: #ecf0f1; /* Light Grayish Blue */
      font-size: 24px;
      margin-bottom: 10px;
    }

    p {
      color: #bdc3c7; /* Silver */
      font-size: 18px;
    }
  }
`;

const GetStartedButton = styled(Link)`
  background-color: #27ae60; /* Nephritis Green */
  color: #ecf0f1; /* Light Grayish Blue */
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 5px;
  font-size: 20px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #219a52; /* Darker Nephritis Green */
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Navbar>
        <Logo>Event Planner</Logo>
        <NavigationLinks>
          <Link to="/login">Login</Link>
          <Link to="/register">SignUp</Link>
        </NavigationLinks>
      </Navbar>
      <Title>Welcome to Event Planner</Title>
      <Description>
        Plan and manage your events with ease. Create, organize, and track your
        events effortlessly.
      </Description>
      <FeaturesList>
        <li>
          <h3>Easy Event Creation</h3>
          <p>Create events with a few simple steps.</p>
        </li>
        <li>
          <h3>RSVP Functionality</h3>
          <p>Allow guests to RSVP to your events.</p>
        </li>
        <li>
          <h3>Calendar View</h3>
          <p>Organize and view your events on a calendar.</p>
        </li>
        <li>
          <h3>User Authentication</h3>
          <p>Secure your events with user authentication.</p>
        </li>
      </FeaturesList>
      <GetStartedButton to="/events">Get Started</GetStartedButton>
    </HomeContainer>
  );
};

export default Home;
