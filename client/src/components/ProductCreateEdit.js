import React from "react";
import { useState, useEffect } from "react"
import { useAppContext } from "../utils/AppContext"
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import { createProduct } from '../utils/product-api';
import styles from "../components/style/styles";

const ProductCreateEdit = () => {
  const appCtx = useAppContext()

  //should be set by the app context
  const [formData, setFormData] = useState([])
  const [renderReady, setRenderReady] = useState(false)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let productClone = { ...appCtx.appState.product, ...formData }

    //reflect the added product on the front page in a 'New Product' section
    //or also reflect updates to products
    appCtx.setAppState({ ...appCtx.appState, product: productClone })

    try {
      const res = await createProduct(productClone);

      if (!res.ok) {
        throw new Error('Error: ProductCreateEdit.createProduct ', res);
      }

      const product = await res.json();
      console.log(product);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    console.log("In ProductCreateEdit.useEffect, appCtx",appCtx.appState.product)
    setFormData(appCtx.appState.product)
    setRenderReady(true)
  }, [])

  return (
    <>
      {renderReady === true && (
        <Container style={styles.container}>
          <Form onSubmit={handleFormSubmit}>
            <Row className="mb-3" style={styles.row}>
              <Col className="mb-3" style={styles.col}>
                <Form.Group className="mb-3" controlId="productName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="product name"
                    value={formData.name}
                    onChange={handleInputChange} />
                </Form.Group>
              </Col>

              <Col className="mb-3" style={styles.col}>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control name="description"
                    type="textarea"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3" style={styles.row}>
              <Col className="mb-3" style={styles.col}>
                <Form.Group className="mb-3" controlId="longDescription">
                  <Form.Label>Long Description</Form.Label>
                  <Form.Control name="description_long"
                    type="textarea"
                    placeholder="Long Description"
                    style={{ height: '100px' }}
                    value={formData.description_long}
                    onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3" style={styles.row}>
              <Col className="mb-3" style={styles.col}>
                <Form.Group controlId="code">
                  <Form.Label>Product Code</Form.Label>
                  <Form.Control name="code"
                    type="text"
                    placeholder="xxxxx-xxx-xxx"
                    value={formData.code}
                    onChange={handleInputChange} />
                </Form.Group>
              </Col>

              <Col className="mb-3" style={styles.col}>
                <Form.Group controlId="sku">
                  <Form.Label>Product SKU</Form.Label>
                  <Form.Control name="sku"
                    type="text"
                    placeholder="987-123-456"
                    value={formData.sku}
                    onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3" style={styles.row}>
              <Col className="mb-3" style={styles.col}>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}>
                    <option>Choose...</option>
                    <option value="Boots">Boots</option>
                    <option value="Camping">Camping</option>
                    <option value="Climbing">Climbing</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Navigation">Navigation</option>
                    <option value="Sleeping Bags">Sleeping Bags</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col className="mb-3" style={styles.col}>
                <Form.Group controlId="subCategory">
                  <Form.Label>Sub-Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="sub_category"
                    value={formData.sub_category}
                    onChange={handleInputChange}>
                    <option>Choose...</option>
                    <option value="Alpine">Alpine</option>
                    <option value="Mountaineering">Mountaineering</option>
                    <option value="Backpacking">Backpacking</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3" style={styles.row}>
              <Col className="mb-3" style={styles.col}>
                <Form.Group controlId="price">
                  <Form.Label>Retail Price</Form.Label>
                  <Form.Control name="price"
                    type="textarea"
                    placeholder="Retail Price"
                    style={{ width: '50%' }}
                    value={formData.price}
                    onChange={handleInputChange} />
                </Form.Group>
              </Col>

              <Col className="mb-3" style={styles.col}>
                <Form.Group controlId="isActive">
                  <Form.Label>Is Active?</Form.Label>
                  <Form.Control
                    as="select"
                    name="is_active"
                    value={formData.is_active}
                    onChange={handleInputChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col className="mb-3" style={styles.col}>
                <Form.Group controlId="isDeal">
                  <Form.Label>Is Deal?</Form.Label>
                  <Form.Control
                    as="select"
                    name="is_deal"
                    value={formData.is_deal}
                    onChange={handleInputChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" onClick={handleFormSubmit}>
              Submit
            </Button>
          </Form>
        </Container>
      )}
    </>
  )
}

export default ProductCreateEdit