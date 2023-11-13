import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // API endpoint for token authentication
    const apiUrl = "http://localhost:8000/api/user/token/";

    // Request payload
    const data = {
      company_name: companyName,
      username: username,
      password: password,
    };

    // Make a POST request to obtain the token
    axios
      .post(apiUrl, data)
      .then((response) => {
        // Save the token in local storage or context for future API requests
        const token = response.data.access;
        localStorage.setItem("access", token);

        // Navigate to the desired page (replace with your page URL)
        navigate("/Disclosures");
      })
      .catch((error) => {
        // Handle authentication error (show an error message, etc.)
        console.error("Authentication error:", error);
        alert("Invalid login credentials");
      });
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card style={{ width: "400px", padding: "20px", borderRadius: "10px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <Form>
          <Form.Group controlId="formCompanyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            className="px-4 m-4"
            variant="primary"
            block
            onClick={handleLogin}
          >
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
