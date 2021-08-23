import { useState, useEffect } from "react"
import { useAppContext } from "../utils/AppContext"
import ProductCreateEdit from "../components/ProductCreateEdit";
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import styles from "../components/style/styles";

const ProductAdmin = (props) => {
  const appCtx = useAppContext()
  const [renderReady, setRenderReady] = useState(false)

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