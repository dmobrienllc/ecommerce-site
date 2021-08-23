import { useState, useEffect } from "react"
import { useAppContext } from "../utils/AppContext"
import ProductCreateEdit from "../components/ProductCreateEdit";
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import { getProductByCode } from '../utils/product-api';
import styles from "../components/style/styles";

const ProductAdmin = (props) => {
  const appCtx = useAppContext()
  const [productCode,setProductCode] = useState('')
  const [renderReady, setRenderReady] = useState(false)

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await getProductByCode(productCode);

      if (!res.ok) {
        throw new Error('Error: ProductCreateEdit.createProduct ', res);
      }

      const productToEdit = await res.json();

      appCtx.setAppState({ ...appCtx.appState, product: productToEdit })
      console.log("ProductAdmin.appCtx",appCtx.appState.product)
      //reset
      setProductCode('')
    } catch (err) {
      console.error(err);
    }
  }

  const handleInputChange = async (e) => {
      console.log("Target ",e.target.name, " ", e.target.value)
      setProductCode(e.target.value)
  }

  useEffect(() => {
    setRenderReady(true);
  }, [])

  return (
    <>
      {renderReady === true && (
        <>
          <Container className="flex" style={styles.container}>
            <Row className="mb-3" style={styles.row}>
              <Col className="mb-3" style={styles.col}>
                <h2>Create or Edit Product</h2>
              </Col>
              <Col>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group size="lg" controlId="email">
                    <Form.Label>enter code:</Form.Label>
                    <Form.Control
                      name="code"
                      type="text"
                      placeholder="123-456-789"
                      value={productCode}
                      onChange={handleInputChange} />
                  </Form.Group>

                  <Button block size="md" type="submit">
                    Search By Sku
                  </Button>
                </Form>
              </Col>
            </Row>
            <Row className="mb-3" style={styles.row}>
              <Col className="mb-3" style={styles.col}>
                <ProductCreateEdit />
              </Col>
            </Row>
          </Container>
        </>
      )}
      <style jsx="true">{`

      `}</style>
    </>
  )
}

export default ProductAdmin