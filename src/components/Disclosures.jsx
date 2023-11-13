import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Disclosures() {
  const navigate = useNavigate();

  const handleNavigateToQuestions = () => {
    // Navigate to the Questions component
    navigate("/questions");
  };

  return (
    <div className="p-4 m-4">
      <h2>Disclosures</h2>
      <Button variant="primary" onClick={handleNavigateToQuestions}>
        Go to Questions
      </Button>
    </div>
  );
}
