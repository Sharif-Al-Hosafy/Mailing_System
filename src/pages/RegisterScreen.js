import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/formContainer";
import { Form, Button, Card } from "react-bootstrap";
const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="danger"
        onClick={() => {
          navigate("/daily");
        }}
      >
        رجوع
      </Button>
      <FormContainer className="text-center">
        <h1 className="mt-5 text-center">تسجيل حساب</h1>
        <Card className="p-3 mt-3">
          <Form>
            <Form.Group controlId="username">
              <Form.Label className="my-2">Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className="my-2">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label className="my-2">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="department">
              <Form.Label className="my-2">Department</Form.Label>
              <Form.Select>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="permissions">
              <Form.Label className="my-2"> Permissions</Form.Label>
              <Form.Check type="checkbox" id="admin" label="admin" />
              <Form.Check type="checkbox" id="send" label="send" />
              <Form.Check type="checkbox" id="sign" label="sign" />
            </Form.Group>
            <Button className="my-3" type="submit" variant="success">
              Register
            </Button>
          </Form>
        </Card>
      </FormContainer>
    </div>
  );
};

export default RegisterScreen;
