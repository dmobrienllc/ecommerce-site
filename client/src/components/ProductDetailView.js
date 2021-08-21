import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Form, Carousel } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { getProductById } from '../utils/product-api';
import { useAppContext } from "../utils/AppContext"

const ProductDetailView = () => {
  const [renderReady, setRenderReady] = useState(false)
  const [formData, setFormData] = useState({});
  const { productId } = useParams();
  const appCtx = useAppContext()

  let history = useHistory();

  useEffect(() => {
    console.log("AppCtx",appCtx.appState.product)
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
      <Container>
        <Form onSubmit={handleFormSubmit}>
          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="product name"
                value={formData.name}
                onChange={handleInputChange} />
            </Form.Group>
          </Row>

          <Carousel>
            {formData.images.map((image) => {
              return (
                <Carousel.Item key={image.url}>
                  <img
                    className="d-block w-25 h-25"
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

          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="price">
              <Form.Label>Retail Price</Form.Label>
              <Form.Control name="price"
                type="textarea"
                placeholder="Retail Price"
                style={{ width: '50%' }}
                value={formData.price}
                onChange={handleInputChange} />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="isActive">
              <Form.Check type="checkbox"
                name="is_active"
                value={formData.is_active}
                label="Is Active?"
                onChange={handleInputChange} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description"
                type="textarea"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="longDescription">
              <Form.Label>Long Description</Form.Label>
              <Form.Control name="description_long"
                type="textarea"
                placeholder="Long Description"
                style={{ height: '100px' }}
                value={formData.description_long}
                onChange={handleInputChange} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="code">
              <Form.Label>Product Code</Form.Label>
              <Form.Control name="code"
                type="text"
                placeholder="xxxxx-xxx-xxx"
                value={formData.code}
                onChange={handleInputChange} />
            </Form.Group>

            <Form.Group as={Col} controlId="sku">
              <Form.Label>Product SKU</Form.Label>
              <Form.Control name="sku"
                type="text"
                placeholder="987-123-456"
                value={formData.sku}
                onChange={handleInputChange} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="category">
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
          </Row>

          <Button variant="primary" type="submit" onClick={handleFormSubmit}>
            Add To Cart
          </Button>
        </Form>
      </Container>
    )}
  </>
  );
};

export default ProductDetailView;
