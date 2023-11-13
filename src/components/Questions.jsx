import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Form, Button } from "react-bootstrap";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Fetch questions from the API
        const response = await axios.get(
          "http://localhost:8000/api/questions/questions/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    try {
      // Fetch the user ID
      const responseUserId = await axios.get(
        "http://localhost:8000/api/user/userid/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      const userId = responseUserId.data.user_id;
      console.log(userId);

      // Check if all questions are answered
      const allQuestionsAnswered = questions.every(
        (question) => answers[question.id] !== undefined
      );

      if (!allQuestionsAnswered) {
        alert("Please answer all questions before submitting.");
        return;
      }

      // Prepare the payload for submission
      const data = Object.entries(answers).map(([questionId, answer]) => ({
        question: questionId.toString(),
        user: userId.toString(),
        answer: answer.toString(),
      }));

      // Submit answers to the API
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      };

      await axios.post(
        "http://localhost:8000/api/questions/answers/",
        data,
        config
      );

      // Display success message
      alert("Answers submitted successfully!");

      // Clear answers after submission
      setAnswers({});

      // Set submitted state to true
      setSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching user ID or submitting answers. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      {submitted ? (
        <div className="text-center">
          <h3>Answers submitted successfully!</h3>
        </div>
      ) : (
        <>
          <h2 className="text-center mb-4">Questions</h2>
          <Table bordered striped responsive>
            <thead>
              <tr>
                <th className="col-8">Question</th>
                <th className="col-4">Answer</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr key={question.id}>
                  <td>{question.content}</td>
                  <td>
                    {question.answer_type === "yes_no" && (
                      <div>
                        <Form.Check
                          inline
                          label="Yes"
                          type="radio"
                          name={`question_${question.id}`}
                          id={`yes_${question.id}`}
                          onChange={() => handleAnswerChange(question.id, true)}
                        />
                        <Form.Check
                          inline
                          label="No"
                          type="radio"
                          name={`question_${question.id}`}
                          id={`no_${question.id}`}
                          onChange={() =>
                            handleAnswerChange(question.id, false)
                          }
                        />
                      </div>
                    )}
                    {question.answer_type === "number" && (
                      <Form.Control
                        type="number"
                        onChange={(e) =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                      />
                    )}
                    {question.answer_type === "text" && (
                      <Form.Control
                        as="textarea"
                        onChange={(e) =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-center">
            <Button onClick={handleSubmit}>Submit Answers</Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Questions;
