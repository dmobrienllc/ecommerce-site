import React from "react";
import { useState, useEffect } from "react"
import { useAppContext } from "../utils/AppContext"
import { Container, Col, Row,Button,Form } from 'react-bootstrap';
import { createProduct } from '../utils/product-api';

const ProductCreateEdit = () => {
  const appCtx = useAppContext()

  const defForm = {
    price: 0.00,
    is_active: true,
    name: '',
    description: '',
    description_long: '',
    code: '',
    sku: '',
    category: '',
    sub_category: '',
    inventory: [{
      cnt: 0,
      descriptor: '',
      unit: 0,
      unit_type: ''
    }],
    images: [{
      url: '',
      alt_text: ''
    }]
  }

  //should be set by the app context
  const [formData, setFormData] = useState([])
  //const [ formData, setFormData ] = useState(defForm)
  const [renderReady, setRenderReady] = useState(false)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log("Log: ", "Target", e.target.name, "Value", e.target.value);
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
    // Set the form data state to mirror what's in state for the user
    setFormData(appCtx.appState.product)
    setRenderReady(true)
  }, [])

  return (
    <>
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

              <Form.Group as={Col} controlId="subCategory">
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