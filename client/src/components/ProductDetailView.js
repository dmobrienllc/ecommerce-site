import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Form, Carousel } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../utils/product-api';
import { useAppContext } from "../utils/AppContext";
import styles from "../components/style/styles";
import { useHistory } from "react-router-dom";

const ProductDetailView = () => {
  const [renderReady, setRenderReady] = useState(false)
  //TODO Rename to product data as there is  no submit form involved
  const [formData, setFormData] = useState({});
  const [reviewFormData, setReviewFormData] = useState({})
  const { productId } = useParams();
  const appCtx = useAppContext()
  const history = useHistory();

  useEffect(() => {
    console.log("AppCtx", appCtx.appState.product)
    //initialize on page entry
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

  const handleReviewInputChange = (event) => {
    const { name, value } = event.target;
    setReviewFormData({ ...reviewFormData, [name]: value });
  };

  const handleReviewFormSubmit = async (event) => {
    event.preventDefault();

    formData.reviews.push(reviewFormData)
    setFormData(formData);

    try {
      const response = await updateProduct(formData);

      if (!response.ok) {
        throw new Error('Error: ProductCreateEdit.getProductByCode ', response);
      }

      const updatedProduct = await response.json();
      history.push(`/product/${productId}`)
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
            <Carousel className="d-block w-75 h-100" variant="dark">
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
          <Col style={styles.col}>
            <h5>Leave a review!</h5>
            <Form onSubmit={handleReviewFormSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Label>user:</Form.Label>
                <Form.Control
                  name="user"
                  type="text"
                  placeholder="jsmith"
                  value={reviewFormData.user}
                  onChange={handleReviewInputChange} />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>num_stars:</Form.Label>
                <Form.Control
                  as="select"
                  name="num_stars"
                  value={reviewFormData.num_stars}
                  onChange={handleReviewInputChange}>
                  <option value="1">1 star</option>
                  <option value="2">2 stars</option>
                  <option value="3">3 stars</option>
                  <option value="4">4 stars</option>
                  <option value="5">5 stars</option>
                </Form.Control>
              </Form.Group>

              <Form.Group size="lg" controlId="review">
                <Form.Label>your review:</Form.Label>
                <Form.Control
                  name="text"
                  type="textarea"
                  placeholder="review.."
                  wrap={true}
                  style={{ height: '100px' }}
                  value={reviewFormData.text}
                  onChange={handleReviewInputChange} />
              </Form.Group>
              <Button variant="dark" size="md" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>

        {/* <Form onSubmit={handleFormSubmit}>
          <Row className="mb-3" style={styles.row} xs={2} md={2} lg={2}>
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
        </Form> */}
      </Container>
    )}
  </>
  );
};

export default ProductDetailView;
