import React from "react";
import { useState, useEffect } from "react"
import { useAppContext } from "../utils/AppContext"
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import { createProduct,updateProduct,getProductByCode } from '../utils/product-api';
import styles from "../components/style/styles";
import defaultAppState from '../state/app-state-default';

const ProductCreateEdit = () => {
  const appCtx = useAppContext()

  //should be set by the app context
  const [formData, setFormData] = useState([])
  const [renderReady, setRenderReady] = useState(false)
  //const [newProductName, setNewProductName] = useState('')
  const [productCode,setProductCode] = useState('')

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
      let response;
      //should really be using the reducer pattern here but did not
      //have time to implement; this would not fly in the real world,
      //I get it... :-(
      if(productCode.length > 0){
        console.log("Updating product withh code: ",productCode)
        response = await updateProduct(productClone);
      }else{
        console.log("CreateProduct")
        response = await createProduct(productClone);
      }

      if (!response.ok) {
        throw new Error('Error: ProductCreateEdit.createProduct ', response);
      }

      //TODO: Pass this to modal to present to user.
      const product = await response.json();

      //clear the form for the next action
      //setFormData({ ...formData, product: defaultAppState.product })
      console.log("Form Data Reset")
      setFormData(defaultAppState.product)
      console.log("Form Data: ",formData);
      setProductCode('')
    } catch (err) {
      console.error(err);
    }
  }

  //Search Form
  const handleSearchFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await getProductByCode(productCode);

      if (!res.ok) {
        throw new Error('Error: ProductCreateEdit.getProductByCode ', res);
      }

      const productToEdit = await res.json();
      console.log("Product to Edit: ",productToEdit)
      setFormData(productToEdit)

    } catch (err) {
      console.error(err);
    }
  }

  const handleSearchInputChange = async (e) => {
      console.log("Target ",e.target.name, " ", e.target.value)
      setProductCode(e.target.value)
  }

  useEffect(() => {
    setFormData(defaultAppState.product)
    setRenderReady(true)
  }, [])

  return (
    <>
      {renderReady === true && (
        <Container style={styles.container}>

          <Row className="mb-3" style={styles.row}>
            <Col className="mb-3" style={styles.col}>
              <h2>Create or Edit Product</h2>
              <p>Enter Product Code:</p>
            </Col>
            <Col>
              <Form onSubmit={handleSearchFormSubmit}>
                <Form.Group size="lg" controlId="email">
                  <Form.Control
                    name="code"
                    type="text"
                    placeholder="123-456-789"
                    value={productCode}
                    onChange={handleSearchInputChange} />
                </Form.Group>

                <Button block size="md" type="submit">
                  Search By Code To Edit Product
                </Button>
              </Form>
            </Col>
          </Row>

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
                    <option value="Tents">Tents</option>
                    <option value="Climbing">Climbing</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Pants">Pants</option>
                    <option value="Inner Layers">Inner Layers</option>
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