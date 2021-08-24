import React, { useState, useEffect } from "react";
import { useAppContext } from "../utils/AppContext"
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import styles from "../components/style/styles";
import { createUser } from '../utils/user-api';
import { useHistory } from "react-router-dom";

export default function Signup() {
  const appCtx = useAppContext()
  const history = useHistory();

  const [formData, setFormData] = useState([])
  const [renderReady, setRenderReady] = useState(false)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function validateForm() {
    return true; //email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    formData.logged_in = true;
    
    try {
      const res = await createUser(formData);

      if (!res.ok) {
        throw new Error('Error: Login.handleLoginSubmit ', res);
      }

      const user = await res.json();

      appCtx.setAppState({ ...appCtx.appState, user: user })
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    setFormData(appCtx.appState.user)
    setRenderReady(true)
  }, [])

  return (
    <>
    {renderReady === true && (
      <Container className="flex" style={styles.container}>
        <Row className="mb-3" style={styles.row}>
        <Col style={styles.col}>
              <div className="Message">
                <h2>Sign Up Today!</h2>
              </div>
            </Col>
          <Col style={styles.col}>
            <div className="Signup">
              <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="first_name">
                  <Form.Label>user name:</Form.Label>
                  <Form.Control
                    name="user_name"
                    type="text"
                    placeholder="karenlosesit"
                    value={formData.user_name}
                    onChange={handleInputChange} />
                </Form.Group>
                <Form.Group size="lg" controlId="first_name">
                  <Form.Label>first name:</Form.Label>
                  <Form.Control
                    name="first_name"
                    type="text"
                    placeholder="Karen"
                    value={formData.first_name}
                    onChange={handleInputChange} />
                </Form.Group>

                <Form.Group size="xs" controlId="first_name">
                  <Form.Label>middle initial:</Form.Label>
                  <Form.Control
                    name="middle_init"
                    type="text"
                    placeholder="M"
                    value={formData.middle_int}
                    onChange={handleInputChange} />
                </Form.Group>

                <Form.Group size="lg" controlId="first_name">
                  <Form.Label>last name:</Form.Label>
                  <Form.Control
                    name="last_name"
                    type="text"
                    placeholder="McKaren"
                    value={formData.last_name}
                    onChange={handleInputChange} />
                </Form.Group>

                <Form.Group size="lg" controlId="email">
                  <Form.Label>email:</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="jsmith@email.com"
                    value={formData.email}
                    onChange={handleInputChange} />
                </Form.Group>

                <Form.Group size="lg" controlId="password">
                  <Form.Label>password:</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="xxxxxxxxxxxx"
                    value={formData.password}
                    onChange={handleInputChange} />
                </Form.Group>
                <Button size="sm" variant="dark"type="submit" disabled={!validateForm()}>
                  Sign Up 
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    )}
    </>
  );
}