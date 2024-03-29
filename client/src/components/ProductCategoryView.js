import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CardItem from './CardItem';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../utils/product-api';
import styles from "../components/style/styles";

const ProductCategoryView = () => {
    const [renderReady, setRenderReady] = useState(false)
    const [productList, setProductList] = useState([])
    const { category } = useParams();

    useEffect(() => {
        const getProductList = async () => {
            try {
                const res = await getProductsByCategory(category);
                if (!res.ok) {
                    throw new Error('No Product List returned');
                }
                const products = await res.json();
                setProductList(products);
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
                <Container fluid="md" style={styles.container}>
                    <div><Card>
                        <Card.Header><h1>Category: {category}</h1></Card.Header>
                    </Card>
                    </div>
                    <Row style={styles.row}>
                        {productList.map((product) => {
                            return (
                                <Col style={styles.col} key={product._id}>
                                    <CardItem title={product.name}
                                        text={product.description}
                                        price={product.price}
                                        productDetailUrl={`/product/${product._id}`}
                                        imgSrc={process.env.PUBLIC_URL + `${product.images[0].url}`}
                                        imgAltTitle={`${product.images[0].alt_text}`} />
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            )}
        </>
    );
};

export default ProductCategoryView;
