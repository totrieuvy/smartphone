import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./FeedBack.css";

const FeedBack = () => {
  const { product_id } = useParams(); // Lấy product_id từ URL
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy dữ liệu đánh giá cho sản phẩm cụ thể
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(`https://664f6ea2ec9b4a4a602ec579.mockapi.io/feedback`);
        const data = await response.json();
        const filteredFeedback = data.filter((feedback) => feedback.product_id === product_id); // Lọc theo product_id
        setFeedbackList(filteredFeedback);
      } catch (err) {
        setError("Failed to fetch feedback");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [product_id]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;
  
    const feedbackData = {
      from_id: "4",
      from_content: newFeedback,
      reply_id: "", 
      reply_content: "", 
      status: false,
      create_date: new Date().toISOString(),
      product_id: product_id, 
    };
  
    try {
      const response = await fetch("https://664f6ea2ec9b4a4a602ec579.mockapi.io/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      });
      const newEntry = await response.json();
      setFeedbackList((prev) => [newEntry, ...prev]);
      setNewFeedback("");
    } catch (err) {
      setError("Failed to submit feedback");
    }
  };
  

  return (
    <div className="feedback-page">
      <h2>Feedback for Product {product_id}</h2>
      <Form onSubmit={handleFeedbackSubmit}>
        <Form.Group controlId="feedbackText">
          <Form.Label>Leave your feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
            placeholder="Write your feedback here..."
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Submit Feedback
        </Button>
      </Form>

      {loading ? (
        <p>Loading feedback...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="feedback-list">
          {feedbackList.map((feedback) => (
            <div key={feedback.id} className="feedback-item">
              <p><strong>From:</strong> {feedback.from_id}</p>
              <p><strong>Feedback:</strong> {feedback.from_content}</p>
              <p><strong>Date:</strong> {new Date(feedback.create_date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedBack;
