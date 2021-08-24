import { Card, Col, Row } from "react-bootstrap"

export default function CardItem(props) {
    return (
        <Card style={{ width: '12rem' }}>
            <Card.Img variant="top" src={props.imgSrc} alt={props.imgAltTitle} title={props.imgAltTitle} />
            <Card.Body>
                <Card.Title>
                    {props.title}
                </Card.Title>
                <Card.Text>
                    {props.text}
                </Card.Text>
                <Card.Text>
                    Price: ${props.price}
                </Card.Text>
            </Card.Body>
            <Card.Body>
                <Col>
                    <Row>
                        <Card.Link href={props.productDetailUrl}>Check out the {props.title}</Card.Link>
                    </Row>
                </Col>
            </Card.Body>
        </Card>
    )
}

