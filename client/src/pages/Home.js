import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../utils/product-api';
import { Container, Col, Row, Button} from 'react-bootstrap';
import styles from "../components/style/styles";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [renderReady, setRenderReady] = useState(false)

  useEffect(() => {
    const getProductList = async () => {
      try {
        const res = await getAllProducts();
        if (!res.ok) {
          throw new Error('No Product List returned');
        }
        const productList = await res.json();
        setProductList(productList);
      } catch (err) {
        console.error(err);
      }
    };
    getProductList();
    setRenderReady(true);
  }, []);

  return (
    <>
      {renderReady === true && (
        <Container className="flex" style={styles.container}>
          <Row className="mb-3" style={styles.row}>
            <Col className="mb-3" style={styles.col}>
              <div className="card bg-white card-rounded w-170 mt-2">
                <div className="card-header bg-dark text-center">
                  <h3>Welcome to David OBrien's Outdoor Adventure Store!</h3>
                </div>
                <div className="card-body m-8">
                  <h5>Check out our deals of the week:</h5>
                  <ul className="square">
                    {productList.filter(product => product.is_deal).map((product) => {
                      return (
                        <li key={product._id}>
                          <Link to={{ pathname: `/product/${product._id}` }}>
                            {product.category}: {product.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Col>
            <Col className="mb-3" style={styles.col}>
              <h3>Present category cards here...</h3>
            </Col>
            <Col className="mb-3" style={styles.col}>
              <Row style={styles.row}>
                <Col style={styles.col}>
                  <h3>Already a member? Login.. </h3>
                  <Button block variant="dark" size="xs" type="submit" href="/login">
                      Log in
                  </Button>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col style={styles.col}>
                  <h3>Or sign up today! </h3>
                  <Button block variant="dark" size="xs" type="submit" color="black" href="/signup">
                    Sign Up
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Home;
