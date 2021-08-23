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
    return true; //email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    let userClone = { ...appCtx.appState.user, ...formData }

    //redirect the user to the home page with a welcome message
    appCtx.setAppState({ ...appCtx.appState, user: userClone })

    try {
      const res = await getUserByEmail(userClone.email);

      if (!res.ok) {
        throw new Error('Error: Login.handleLoginSubmit ', res);
      }

      const user = await res.json();
      console.log(user);
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
      <Container className="flex" style={styles.container}>
        <Row className="mb-3" style={styles.row}>
          <Col style={styles.col}>
            <div className="Message">
              <h2>This should occupy half the space.</h2>
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
                <Button block size="md" type="submit" disabled={!validateForm()}>
                  Login
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}