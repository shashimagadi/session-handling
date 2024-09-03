import React from "react";
import { Card, Form, Button } from "react-bootstrap";

const RegistrationPage = () => {
  return (
    <div>
      return (
      <div className="container mt-5">
        <Card className="card">
          <Card.Body>
            <Card.Title className="card-title">Registration Form</Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="form-label">Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit" className="btn-submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      );
    </div>
  );
};

export default RegistrationPage;
