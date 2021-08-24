import React, { useState, useEffect } from "react";
import { useAppContext } from "../utils/AppContext"
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import styles from "../components/style/styles";
import { getUserByEmail } from '../utils/user-api';
import { useHistory } from "react-router-dom";

export default function Login() {
  const appCtx = useAppContext()
  const history = useHistory();

  //should be set by the app context
  const [formData, setFormData] = useState([])
  const [renderReady, setRenderReady] = useState(false)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function validateForm() {
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await getUserByEmail(formData.email);

      if (!res.ok) {
        throw new Error('Error: Login.handleLoginSubmit ', res);
      }

      const user = await res.json();

      appCtx.setAppState({ ...appCtx.appState, user: user })
      console.log("App Ctx User", appCtx.appState.user)

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
                <h2>Login User....</h2>
              </div>
            </Col>
            <Col style={styles.col}>
              <div className="Login">
                <Form onSubmit={handleSubmit}>
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
                  <Button block variant="dark" size="md" type="submit" disabled={!validateForm()}>
                    Login
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