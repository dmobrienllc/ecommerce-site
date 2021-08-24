import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Form, Carousel } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getProductById } from '../utils/product-api';
import { useAppContext } from "../utils/AppContext";
import styles from "../components/style/styles";

const ProductDetailView = () => {
  const [renderReady, setRenderReady] = useState(false)
  const [formData, setFormData] = useState({});
  const { productId } = useParams();
  const appCtx = useAppContext()

  useEffect(() => {
    console.log("AppCtx", appCtx.appState.product)
    setFormData(appCtx.appState.product)

    const getProductDetail = async () => {
      try {
        const res = await getProductById(productId);
        if (!res.ok) {
          throw new Error('No Product List returned');
        }
        const product = await res.json()
        console.log("Product ", product)
        setFormData(product);
      } catch (err) {
        console.error(err);
      }
    };

    getProductDetail();
    setRenderReady(true);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //Method will add to shopping cart, not update product
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // console.log(product);
      // history.push(`/product/${product._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (<>
    {renderReady === true && (
      <Container fluid="md" style={styles.container}>
        <Row className="mb-3" style={styles.row}>
          <Col style={styles.col}>
            <h3>Product: {formData.name}</h3>
            <h5>Description: {formData.description}</h5>
            <p>{formData.description_long}</p>
            <p>Retail Price: {formData.price}</p>
          </Col>
          <Col style={styles.col}>
            <Carousel className="d-block w-75 h-100">
              {formData.images.map((image) => {
                return (
                  <Carousel.Item key={image.url}>
                    <img
                      className="d-block w-75 h-75"
                      src={process.env.PUBLIC_URL + `${image.url}`}
                      alt={image.alt_text}
                    />
                    <Carousel.Caption>
                      <h3>{image.alt_text}</h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Col>
        </Row>

        <Row className="mb-3" style={styles.row}>
          <Col style={styles.col}>
            <h5>Reviews: </h5>
            {formData.reviews.map((review) => {
              return (
                <Row className="mb-3" style={styles.row} key={review.user}>
                  <Col style={styles.col}>
                    <p><strong>{review.user} : {`${review.num_stars} star`}</strong></p>
                    <p>{review.text}</p>
                  </Col>
                </Row>
              )
            })}
          </Col>
        </Row>

        <Form onSubmit={handleFormSubmit}>
          <Row className="mb-3">
            <Col style={styles.col}>
              <Form.Group as={Col} className="mb-3" controlId="qty">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={1}
                  onChange={handleInputChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col style={styles.col}>
              <p>Buy one (or more!) today!</p>
              <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                Add To Cart
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    )}
  </>
  );
};

export default ProductDetailView;
