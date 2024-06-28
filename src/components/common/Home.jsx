// src/components/Home.js
import React from "react";
import { Carousel, Container, Row, Col, Card } from "react-bootstrap";

const Home = () => (
  <div>
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="banner1.jpg" alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="banner2.jpg" alt="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Img variant="top" src="product1.jpg" />
            <Card.Body>
              <Card.Title>Product 1</Card.Title>
              <Card.Text>Product description.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="product2.jpg" />
            <Card.Body>
              <Card.Title>Product 2</Card.Title>
              <Card.Text>Product description.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Home;
