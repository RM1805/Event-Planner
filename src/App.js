// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import Login from "./Login";
import Events from "./Events";
import Register from "./Register";
import Home from "./Home";

const AppContainer = styled.div`
  font-family: "Arial", sans-serif;
`;

const ProtectedRoute = ({ element }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return element;
};

function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/events"
            element={<ProtectedRoute element={<Events />} />}
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
