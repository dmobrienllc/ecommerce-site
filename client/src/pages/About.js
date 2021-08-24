import React, { useState,useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "../components/style/styles";

function About() {
    const [renderReady, setRenderReady] = useState(false)

    useEffect(() => {
        setRenderReady(true);
    }, []);

    return (
        <>
            {renderReady === true && (
                <Container fluid="md" style={styles.container}>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <img src={process.env.PUBLIC_URL + `/images/personal/summit.jpeg`} alt="David At The Summit" />
                        </Col>
                        <Col style={styles.col}>
                            <p>Once upon a time there was an adventurous soul named David O'Brien who thought
                                it might be a great idea to turn his passion for adventure in the outdoors to
                                a business dedicated to helping others enjoy the same.
                            </p>

                            <p>Though David was wildly successful in business the demands on his time were such
                                that he was never able to summit another mountain ever again in his life. This
                                led to bouts of drinking and depression and he took his own life at the young
                                age of 62. RIP David.
                            </p>

                            <p>The good news is his legacy lives on in the form of David O'Brien's Outdoor Store,
                                owned and operated to this day by his loyal employees, mainly because they were
                                also a bunch of climbing bums who didn't know how to do anything else!
                            </p>
                        </Col>
                    </Row>
                </Container>
            )}
        </>)
}
export default About;